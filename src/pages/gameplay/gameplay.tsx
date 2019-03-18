import React, { useState, useEffect } from 'react'
import compose from '../../utils/compose';
import { RouteComponentProps } from 'react-router';
import withGameplaySession, { IWithGameplaySessionContext } from '../../providers/gameplay-session/consumer';
import { CircularProgress, Typography } from '@material-ui/core';
import { IGame } from '../../providers/gameplay-session/context';
import ScavengerHunt from '../../containers/scavenger-hunt';
import Snowman from '../../containers/snowman';

interface IProps extends 
  RouteComponentProps<{ gameId: string }>,
  IWithGameplaySessionContext {}

const getGameScreen = (gametype: string, game: IGame, questions: any, questionsStatus: any) => {
  switch(gametype) {
    case 'qanda':
      return () => (
        <ScavengerHunt game={game} questions={questions} questionsStatus={questionsStatus} />
      );
    case 'snowman':
      return () => <Snowman game={game} />;
  }
}

const GameplayPage: React.FC<IProps> = ({ match, gameplaySessionContext }) => {
  const { gameId }  = match.params;
  const [game, setGame] = useState<IGame | null>(gameplaySessionContext.games[gameId]);
  const gameIsFetching = gameplaySessionContext.fetchingGames[gameId];

  useEffect(() => {
    if (game) return;
    gameplaySessionContext.getGame(gameId).then(gamedata => {
      setGame(gamedata);
    })
  }, [])

  if (!game && gameIsFetching) {
    return <CircularProgress />
  }

  if (!game) {
    return <Typography>Game cannot be found, return to the games listing</Typography>
  }

  const { questionsByGameId, gameplaySession } = gameplaySessionContext;
  const questions = questionsByGameId[gameId];
  const questionsStatus = gameplaySession ? gameplaySession.games[gameId].questions : {};
  const Component = getGameScreen(game.gametype, game, questions, questionsStatus);
  
  if (!Component) return null;
  return <Component />
}

const Gameplay = compose(withGameplaySession)(GameplayPage);

export default Gameplay
