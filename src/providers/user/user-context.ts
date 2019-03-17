import { User } from 'firebase/app';
import * as React from 'react';

interface IContext {
  user: User | null;
  isAuthenticated: () => boolean;
  getCurrentUser(): Promise<User | null>;
}

export default React.createContext <IContext>({
  user: null,
  isAuthenticated: () => false,
  getCurrentUser: () => Promise.resolve(null),
});