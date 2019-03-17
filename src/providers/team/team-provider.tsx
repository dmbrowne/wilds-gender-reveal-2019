import React, { useState } from 'react'
import TeamContext from './team-context';
import { withUser } from '../user';
import { IWithUserContext } from '../user/user-consumer';
import { getFirestore, getFirebaseAuth } from '../../firebase';
import gameconfig from '../../gameconfig';

const TeamProvider: React.FC<IWithUserContext> = ({ children, userContext }) => {
  const [selectedTeam, setSelectedTeam] = useState<firebase.firestore.DocumentData | null>(null);

  const saveSelectedTeam = async () => {
    const user = getFirebaseAuth().currentUser;
    if (!user) throw Error('not logged in');

    const userRef = getFirestore('users').doc(user.uid);
    const competitionRef = getFirestore('competitions').doc(gameconfig.competitionId);
    const teamMembersRef = competitionRef.collection('teamMembers');
    const teamMemberQuerySnapshot = await teamMembersRef.where('user', '==', userRef).get();

    if (!selectedTeam) throw Error('no team selected');
    
    if (!teamMemberQuerySnapshot.empty) {
      return teamMemberQuerySnapshot.docs[0].ref.update({
        team: competitionRef.collection('teams').doc(selectedTeam.id)
      });
    }
  
    return teamMembersRef.add({
      user: userRef,
      team: competitionRef.collection('teams').doc(selectedTeam.id)
    })
  }

  return (
    <TeamContext.Provider value={{ selectedTeam, setSelectedTeam, saveSelectedTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

export default withUser(TeamProvider)
