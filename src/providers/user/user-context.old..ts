import { User } from 'firebase/app';
import * as React from 'react';

export default React.createContext({
  user: null,
  isAuthenticated: () => ({}),
  getCurrentUser: () => ({}),
});