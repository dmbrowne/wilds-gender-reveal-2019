import { useState, useEffect } from 'react'
import { realtimeDatabase } from '../firebase';

const useTeamSession = (sessionId?: string, teamId?: string) => {
  const [teamSession, setTeamSession] = useState<{id: string, [key: string]: any} | null>(null);

  useEffect(() => {
    if (!sessionId || !teamId) return;

    realtimeDatabase()
      .ref(`sessionTeams/${sessionId}/${teamId}`)
      .once('value')
      .then((querysnapshot) => querysnapshot.val())
      .then((gameplaySessionId: string | null) => {
        if (!gameplaySessionId) {
          throw new Error(`teamId: ${teamId} does not have gameplaySession for this session`);
        }
        return realtimeDatabase().ref(`gameplaySessions/${gameplaySessionId}`).once('value');
      })
      .then(gameplaySession => {
        if (!gameplaySession.exists()) {
          throw new Error(`gameplay session cannot be found with key: ${gameplaySession.key}`);
        }
        setTeamSession({ id: gameplaySession.key, ...gameplaySession.val() })
      })
  }, [sessionId, teamId]);

  return teamSession;
}

export default useTeamSession
