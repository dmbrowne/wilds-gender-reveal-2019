import React, { useState, useEffect } from "react";
import ScavengerHunt from "../../components/scavenger-hunt";
import { CircularProgress, Dialog } from "@material-ui/core";
import withGameplaySession, { IWithGameplaySessionContext } from "../../providers/gameplay-session/consumer";
import compose from "../../utils/compose";
import { withRouter, RouteComponentProps, matchPath } from "react-router";
import GameWon from "../../components/game-won";
import { IGame } from "../../providers/gameplay-session/context";

interface IProps
  extends IWithGameplaySessionContext,
    RouteComponentProps<{
      gameId: string;
      sessionId: string;
      gameplaySessionId: string;
    }> {
  game: IGame;
  questions: any;
  questionsStatus: any;
}

class ScavengerHuntContainer extends React.Component<IProps> {
  state = {
    isCongratsShown: false
  };

  componentDidMount() {
    const { gameplaySession } = this.props.gameplaySessionContext;
    const { gameId } = this.props.match.params;
    if (gameplaySession && !!gameplaySession.games[gameId].completedAt) {
      this.setState({ isCongratsShown: true });
    }
  }

  componentDidUpdate = (prevProps: IProps) => {
    if (!prevProps.gameplaySessionContext.gameplaySession || !this.props.gameplaySessionContext.gameplaySession) {
      return;
    }

    const { gameId } = this.props.match.params;
    const prevGameplaySession = prevProps.gameplaySessionContext.gameplaySession;
    const { gameplaySession } = this.props.gameplaySessionContext;

    if (
      !!gameplaySession.games[gameId].completedAt &&
      gameplaySession.games[gameId].completedAt !== prevGameplaySession.games[gameId].completedAt
    ) {
      this.setState({ isCongratsShown: true });
    }
  };

  addCode = (code: string) => {
    return new Promise((resolve, reject) => {
      const { match, gameplaySessionContext } = this.props;
      const question = this.props.questions.filter((question: any) => question.code === code)[0];
      if (!question) {
        alert("Nothing with that code can be found. Double check the code and try again");
        return reject();
      }
      return gameplaySessionContext
        .unlockQuestion(question.id, match.params.gameId)
        .then(() => resolve())
        .catch(() => reject());
    });
  };

  render() {
    const { game, questions, questionsStatus, gameplaySessionContext, match, history } = this.props;
    const { gameId } = match.params;

    const matched = matchPath(history.location.pathname, {
      path: "/:sessionId/:gameplaySessionId"
    });
    const { sessionId, gameplaySessionId } = (matched && matched.params) || ({} as any);

    if (!game || !questions) {
      return <CircularProgress />;
    }

    const { markQuestionAsComplete, gameplaySession } = gameplaySessionContext;
    const gameStatus = gameplaySession && gameplaySession.games[gameId];
    const pointsAvailable = (gameStatus && gameStatus.pointsAvailable) || 0;
    const complete = (gameStatus && !!gameStatus.completedAt) || false;
    const currentGameOrderNumber = gameStatus && gameStatus.order;

    const gamesOrder = gameplaySession
      ? Object.entries(gameplaySession.games).sort(([, gameA], [, gameB]) => gameA.order - gameB.order)
      : null;

    const follwingGames =
      currentGameOrderNumber && gamesOrder
        ? gamesOrder.filter(([gameId, game]) => game.order > currentGameOrderNumber)
        : [[]];

    const [nextGameId] = follwingGames[0];

    const questionsWithStatus = questions.map((question: any) => ({
      ...question,
      ...((questionsStatus && questionsStatus[question.id]) || {})
    }));

    const onContinue = () => history.push(`/${sessionId}/${gameplaySessionId}`);
    const onGoBack = () => history.push(`/${sessionId}/${gameplaySessionId}`);
    return (
      <>
        <ScavengerHunt
          complete={complete}
          totalClues={questions.length}
          cluesFound={questionsWithStatus.filter(({ unlockedAt }: any) => !!unlockedAt).length}
          clues={questionsWithStatus}
          onAddCode={this.addCode}
          onContinue={(!!nextGameId && onContinue) || undefined}
          onGoBack={onGoBack}
          onGuessSuccess={questionId => {
            markQuestionAsComplete(questionId, gameId);
          }}
        />
        <Dialog open={this.state.isCongratsShown}>
          <GameWon onClose={() => this.setState({ isCongratsShown: false })} points={pointsAvailable} />
        </Dialog>
      </>
    );
  }
}

const ScavengerHuntGame = compose(
  withRouter,
  withGameplaySession
)(ScavengerHuntContainer);

export default ScavengerHuntGame;
