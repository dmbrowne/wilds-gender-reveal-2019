import * as React from 'react';
import { User, firestore } from 'firebase';

const context = React.createContext({
  user: {} as User | null,
  player: {} as firestore.DocumentData | null,
});

export default context;