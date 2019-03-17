import React from 'react';

export interface ISession {
  id: string;
  name: string;
  competitionId: string;
  completedAt: Date | false;
}

export interface IContext {
  currentSession: ISession | null;
  setCurrentSession: (session: any) => any;
}

export default React.createContext<IContext>({
  currentSession: null,
  setCurrentSession: () => {},
})