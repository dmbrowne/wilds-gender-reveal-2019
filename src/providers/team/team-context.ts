import React from 'react';

// interface ITeam extends  {
//   id: string;
//   name: string;
// }

export interface IContext {
  selectedTeam: firebase.firestore.DocumentData | null;
  setSelectedTeam: (team: any) => any;
  saveSelectedTeam: () => any;
}

export default React.createContext<IContext>({
  selectedTeam: null,
  setSelectedTeam: () => {},
  saveSelectedTeam: () => {},
})