import React from "react";

export interface ISessionGame {
  active: boolean;
  slug: string;
  order: number;
  pointsAvailable: number;
  completedAt: Date | false;
  unlockedAt: Date | false;
  gameId: string;
  displayHidden: boolean;
  [key: string]: any;
}

export interface IGame {
  title: string;
  coverImage?: string;
  [key: string]: any;
}

export interface IGameplaySession {
  completedAt: Date | false;
  sessionId: string;
  teamId: string;
  totalScore: number;
  [key: string]: any;
  games: {
    [gameId: string]: ISessionGame;
  };
}

export interface IContext {
  gameplaySession: IGameplaySession | null;
  setGameplaySessionById: (session: any) => any;
  getGame: (gameId: string) => Promise<{ id: string } & IGame | null>;
  markQuestionAsComplete: (questionId: string, gameId: string) => any;
  unlockNextQuestion: (questionId: string, gameId: string) => any;
  unlockQuestion: (questionId: string, gameId: string) => any;
  markGameAsComplete: (gameId: string) => any;
  fetchingGames: {
    [gameId: string]: boolean;
  };
  games: {
    [gameId: string]: IGame;
  };
  questionsById: {
    [questionId: string]: any;
  };
  questionsByGameId: {
    [gameId: string]: any;
  };
}

export default React.createContext<IContext>({
  games: {},
  fetchingGames: {},
  questionsById: {},
  questionsByGameId: {},
  gameplaySession: null,
  getGame: () => Promise.resolve(null),
  setGameplaySessionById: () => void 0,
  markQuestionAsComplete: () => {},
  unlockNextQuestion: () => {},
  unlockQuestion: () => {},
  markGameAsComplete: () => {}
});
