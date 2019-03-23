import React, { useState, useEffect } from "react";
import SessionContext, { IGameplaySession, IContext, IGame } from "./context";
import { getFirestore, realtimeDatabase } from "../../firebase";
import { withSession } from "../session";
import { IWithSessionContext } from "../session/session-consumer";
import convertQuerySnapshotToMap from "../../utils/querysnapshot-to-map";

const GameplaySessionProvider: React.FC<IWithSessionContext> = ({ children }) => {
  const [gameplaySession, updateGameplaySession] = useState<IGameplaySession | null>(null);
  const [fetchingGames, setFetchingGames] = useState<IContext["fetchingGames"] | {}>({});
  const [games, setGames] = useState<IContext["games"] | {}>({});
  const [questionsById, setQuestionsById] = useState({});
  const [questionsByGameId, setQuestionsByGameId] = useState<{
    [key: string]: any;
  }>({});

  const increaseTeamSessionScore = (increment: number) => {
    if (!gameplaySession) return;
    return realtimeDatabase()
      .ref(`gameplaySessions/${gameplaySession.id}`)
      .update({ totalScore: gameplaySession.totalScore + increment });
  };

  const isAllGameQuestionsComplete = (gameId: string, exlcudingId?: string) => {
    const questionSet = questionsByGameId[gameId];
    return questionSet.every((question: any) => {
      if (question.id === exlcudingId) return true;
      return (
        !!gameplaySession &&
        !!gameplaySession.games[gameId] &&
        !!gameplaySession.games[gameId].questions &&
        !!gameplaySession.games[gameId].questions[question.id] &&
        !!gameplaySession.games[gameId].questions[question.id].completedAt
      );
    });
  };

  const updateGameSession = (gameId: string, data: { [key: string]: any }) => {
    if (gameplaySession) {
      return realtimeDatabase()
        .ref(`gameplaySessions/${gameplaySession.id}`)
        .child(`/games/${gameId}`)
        .update({ ...data });
    }
  };

  const updateQuestionStatus = (questionId: string, gameId: string, data: { [key: string]: any }) =>
    new Promise((resolve, reject) => {
      if (!gameplaySession) return reject();

      return realtimeDatabase()
        .ref(`gameplaySessions/${gameplaySession.id}`)
        .child(`/games/${gameId}`)
        .child(`/questions/${questionId}`)
        .update({ ...data })
        .then(() => resolve());
    });

  const markQuestionAsComplete = (questionId: string, gameId: string) => {
    updateQuestionStatus(questionId, gameId, {
      completedAt: new Date().getTime()
    }).then(() => {
      if (gameplaySession) {
        const sessionGame = gameplaySession.games[gameId];
        if (sessionGame && !sessionGame.completedAt) {
          if (isAllGameQuestionsComplete(sessionGame.gameId, questionId)) {
            markGameAsComplete(gameId);
          }
        }
      }
    });
  };

  const unlockNextQuestion = (questionId: string, gameId: string) => {
    const currentQuestionSet = questionsByGameId[gameId];
    const currentQuestionIdx = currentQuestionSet.findIndex(({ id }: { id: string }) => id === questionId);
    if (currentQuestionIdx) {
      const nextQuestion = currentQuestionSet[currentQuestionIdx + 1];
      if (!nextQuestion) {
        console.info("next question not found");
      }
      unlockQuestion(nextQuestion.id, gameId);
    }
  };

  const unlockQuestion = (questionId: string, gameId: string) => {
    console.info("unlocking question: ", questionId);
    return updateQuestionStatus(questionId, gameId, {
      unlockedAt: new Date().getTime()
    });
  };

  const markGameAsComplete = (gameId: string) => {
    updateGameSession(gameId, { completedAt: new Date().getTime() });
    if (gameplaySession) {
      increaseTeamSessionScore(gameplaySession.games[gameId].pointsAvailable);
    }
  };

  const fetchGameData = (gameId: string) => {
    setFetchingGames({ ...fetchingGames, [gameId]: true });
    return getFirestore("games")
      .doc(gameId)
      .get()
      .then(documentSnapshot => {
        setFetchingGames({ ...fetchingGames, [gameId]: false });
        return documentSnapshot;
      });
  };

  const getGame = (gameId: string) => {
    return fetchGameData(gameId).then(documentSnapshot => {
      const { id } = documentSnapshot;
      const data = documentSnapshot.data();
      if (!data) {
        setGames({ ...games, [gameId]: null });
      }
      const game = { id, ...(data as IGame) };
      setGames({ ...games, [gameId]: game });
      return game;
    });
  };

  const setGameplaySessionById = (id: string) => {
    realtimeDatabase()
      .ref(`gameplaySessions/${id}`)
      .on("value", datasnapshot => {
        updateGameplaySession(datasnapshot ? { id, ...datasnapshot.val() } : null);
      });
  };

  const fetchGameQuestions = (gameId: string) => {
    return getFirestore("questions")
      .where("game", "==", getFirestore("games").doc(gameId))
      .orderBy("order")
      .get()
      .then(querySnapshot => convertQuerySnapshotToMap(querySnapshot));
  };

  useEffect(() => {
    if (!gameplaySession) return undefined;
    Promise.all(Object.keys(gameplaySession.games).map(gameId => fetchGameData(gameId))).then(documentSnapshots => {
      const fetchedGames = documentSnapshots.reduce(
        (accum, snapshot) => ({
          ...accum,
          [snapshot.id]: snapshot.data()
        }),
        {}
      );
      setGames({ ...games, ...fetchedGames });
    });
  }, [gameplaySession]);

  useEffect(() => {
    const fetchProgress = Object.keys(games).map(gameId =>
      fetchGameQuestions(gameId).then(questionsData => [gameId, questionsData])
    );
    Promise.all(fetchProgress).then((data: any) => {
      const questionsDataById = {} as { [questionId: string]: any };
      const questionsDataByGameId = {} as { [gameId: string]: any[] };
      data.forEach(([gameId, questionsData]: [string, any]) => {
        questionsData.forEach((question: any) => {
          questionsDataById[question.id] = question;
        });
        questionsDataByGameId[gameId] = questionsData;
      });
      setQuestionsById(questionsDataById);
      setQuestionsByGameId(questionsDataByGameId);
    });
  }, [games]);

  return (
    <SessionContext.Provider
      children={children}
      value={{
        games,
        getGame,
        questionsById,
        questionsByGameId,
        fetchingGames,
        gameplaySession,
        setGameplaySessionById,
        markQuestionAsComplete,
        unlockNextQuestion,
        unlockQuestion,
        markGameAsComplete
      }}
    />
  );
};

export default withSession(GameplaySessionProvider);
