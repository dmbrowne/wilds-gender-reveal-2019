import { useState, useEffect } from "react";
import gameConfig from '../gameconfig';
import { realtimeDatabase } from "../firebase";

interface ISession {
  name: string;
  competitionId: string;
  completedAt: Date | false;
}

const useSessions = () => {
  const [sessions, setSessions] = useState <ISession[] | null>(null);
  useEffect(() => {
    realtimeDatabase()
      .ref('sessions')
      .orderByChild('competitionId')
      .equalTo(gameConfig.competitionId)
      .once('value')
      .then(datasnapshot => {
        setSessions(datasnapshot.val())
      })
  }, [])
  return sessions;
}

export default useSessions;