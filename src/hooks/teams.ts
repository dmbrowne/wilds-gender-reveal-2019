import React, { useEffect, useState } from 'react'
import gameconfig from '../gameconfig';
import { getFirestore } from '../firebase';

interface ITeam {
  id: string,
  theme: 'mr' | 'mrs',
  [key: string]: any
}

const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[] | null>(null);

  useEffect(() => {
    Promise.all([
      getFirestore('competitions').doc(gameconfig.competitionId).collection('teams').doc(gameconfig.teamMrId).get(),
      getFirestore('competitions').doc(gameconfig.competitionId).collection('teams').doc(gameconfig.teamMrsId).get()
    ]).then(([mrDocumentSnapshot, mrsDocumentSnapshot]) => {
      setTeams([
        {
          id: mrDocumentSnapshot.id,
          theme: 'mr',
          ...mrDocumentSnapshot.data(),
        },
        {
          id: mrsDocumentSnapshot.id,
          theme: 'mrs',
          ...mrsDocumentSnapshot.data(),
        },
      ])
    })
  }, [])
  return teams;
}

export default useTeams;
