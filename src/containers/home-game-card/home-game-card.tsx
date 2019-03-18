import React from 'react'
import withGameplaySession, { IWithGameplaySessionContext } from '../../providers/gameplay-session/consumer';
import { LinearProgress } from '@material-ui/core';
import CustomSnackbarContent from '../../components/snackbar/snackbar-content';
import { GameCard } from '../../components/game-cards';

interface IProps extends IWithGameplaySessionContext {
  gameId: string;
  onPlay: () => any;
}

const HomeGameCardComponent: React.FC<IProps> = ({ gameId, gameplaySessionContext, onPlay }) => {
  const gameData = gameplaySessionContext.games[gameId];
  const gameSessionData = gameplaySessionContext.gameplaySession && gameplaySessionContext.gameplaySession.games[gameId];

  if (gameplaySessionContext.fetchingGames[gameId] || !gameSessionData) {
    return <LinearProgress />
  }

  if (!gameData) {
    return <CustomSnackbarContent variant="error" message="game not found" />
  }

  return (
    <GameCard
      title={gameData.title}
      coverImage={gameData.coverImage}
      isComplete={!!gameSessionData.completedAt}
      isDisabled={!gameSessionData.unlockedAt}
      onPlayClick={onPlay}
    />
  )
}

const HomeGameCard = withGameplaySession(HomeGameCardComponent);

export default HomeGameCard
