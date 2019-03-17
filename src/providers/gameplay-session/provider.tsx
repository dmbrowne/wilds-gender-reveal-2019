import React, { useState, useEffect } from 'react'
import SessionContext, { IGameplaySession, IContext, IGame } from './context';
import { getFirestore } from '../../firebase';

const GameplaySessionProvider: React.FC = ({ children }) => {
  const [gameplaySession, setGameplaySession] = useState<IGameplaySession | null>(null);
  const [fetchingGames, setFetchingGames] = useState<IContext['fetchingGames'] | {}>({});
  const [games, setGames] = useState<IContext['games'] | {}>({});

  const fetchGameData = (gameId: string) => {
    setFetchingGames({ ...fetchingGames, [gameId]: true });
    return getFirestore('games').doc(gameId).get()
      .then(documentSnapshot => {
        setGames({ ...fetchingGames, [gameId]: documentSnapshot.data() });
        setFetchingGames({ ...fetchingGames, [gameId]: false });
        return documentSnapshot;
      })
  }

  useEffect(() => {
    if (!gameplaySession) return undefined;
    Promise.all(
      Object.keys(gameplaySession.games).map(gameId => fetchGameData(gameId)),
    )
    .then((documentSnapshots) => {
      const gameIds = documentSnapshots.map(({ id }) => id).join(', ')
      console.info(`finished fetching games for ids: ${gameIds}`);
    })
  }, [gameplaySession]);

  return (
    <SessionContext.Provider
      value={{
        games,
        fetchingGames,
        gameplaySession,
        setGameplaySession,
      }}
      children={children}
    />
  )
}

export default GameplaySessionProvider
