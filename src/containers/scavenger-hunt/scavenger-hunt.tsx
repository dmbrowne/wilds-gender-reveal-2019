import React, { useState, useEffect } from 'react';
import ScavengerHunt from '../../components/scavenger-hunt';
import { CircularProgress, Dialog } from '@material-ui/core';
import withGameplaySession, {
  IWithGameplaySessionContext,
} from '../../providers/gameplay-session/consumer';
import compose from '../../utils/compose';
import { withRouter, RouteComponentProps } from 'react-router';
import GameWon from '../../components/game-won';
import { IGame } from '../../providers/gameplay-session/context';

interface IProps
  extends IWithGameplaySessionContext,
    RouteComponentProps<{ gameId: string }> {
  game: IGame;
  questions: any;
  questionsStatus: any;
}

class ScavengerHuntContainer extends React.Component<IProps> {
  state = {
    isCongratsShown: false,
  };

  componentDidUpdate = (prevProps: IProps) => {
    if (
      !prevProps.gameplaySessionContext.gameplaySession ||
      !this.props.gameplaySessionContext.gameplaySession
    ) {
      return;
    }

    const { gameId } = this.props.match.params;
    const prevGameplaySession =
      prevProps.gameplaySessionContext.gameplaySession;
    const { gameplaySession } = this.props.gameplaySessionContext;

    if (
      !!gameplaySession.games[gameId].completedAt &&
      gameplaySession.games[gameId].completedAt !==
        prevGameplaySession.games[gameId].completedAt
    ) {
      this.setState({ isCongratsShown: true });
    }
  };

  addCode = (code: string) =>
    new Promise((resolve, reject) => {
      const { match, gameplaySessionContext } = this.props;
      const question = this.props.questions.filter(
        (question: any) => question.code === code,
      )[0];
      if (!question) {
        alert(
          'Nothing with that code can be found. Double check the code and try again',
        );
        return reject();
      }
      return gameplaySessionContext
        .unlockQuestion(question.id, match.params.gameId)
        .then(() => resolve())
        .catch(() => reject());
    });

  render() {
    const {
      game,
      questions,
      questionsStatus,
      gameplaySessionContext,
      match,
    } = this.props;
    const { gameId } = match.params;

    if (!game || !questions) {
      return <CircularProgress />;
    }

    const {
      markQuestionAsComplete,
      gameplaySession,
    } = gameplaySessionContext;
    const pointsAvailable =
      (gameplaySession && gameplaySession.games[gameId].pointsAvailable) || 0;
    const complete =
      (gameplaySession && !!gameplaySession.games[gameId].completedAt) || false;
    const questionsWithStatus = questions.map((question: any) => ({
      ...question,
      ...(questionsStatus[question.id] || {}),
    }));

    return (
      <>
        <ScavengerHunt
          complete={complete}
          totalClues={questions.length}
          cluesFound={
            questionsWithStatus.filter(({ unlockedAt }: any) => !!unlockedAt)
              .length
          }
          clues={questionsWithStatus}
          onAddCode={this.addCode}
          onGuessSuccess={questionId => {
            markQuestionAsComplete(questionId, gameId);
          }}
        />
        <Dialog open={this.state.isCongratsShown}>
          <GameWon
            onClose={() => this.setState({ isCongratsShown: false })}
            points={pointsAvailable}
          />
        </Dialog>
      </>
    );
  }
}

const ScavengerHuntGame = compose(
  withRouter,
  withGameplaySession,
)(ScavengerHuntContainer);

export default ScavengerHuntGame;
