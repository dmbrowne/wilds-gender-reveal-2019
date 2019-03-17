import React from 'react';

export interface IGame {
  active: boolean;
  slug: string;
  order: number;
  pointsAvailable: number;
  completedAt: Date | false;
  unlockeddAt: Date | false;
  [key: string]: any;
}

export interface IGameplaySession {
  completedAt: Date | false;
  sessionId: string;
  teamId: string;
  totalScore: number;
  [key: string]: any;
  games: {
    [gameId: string]: IGame;
  }
}

export interface IContext {
  gameplaySession: IGameplaySession | null;
  setGameplaySession: (session: any) => any;
  fetchingGames: {
    [gameId: string]: boolean;
  };
  games: {
    [gameId: string]: IGame;
  };
}

export default React.createContext<IContext>({
  games: {},
  fetchingGames: {},
  gameplaySession: null,
  setGameplaySession: () => void 0,
})