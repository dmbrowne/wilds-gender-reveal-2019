import { useState, useEffect } from "react";
import { realtimeDatabase } from "../firebase";

interface ISession {
  name: string;
  competitionId: string;
  completedAt: Date | false;
}

const useSessions = (competitionId: string ) => {
  const [sessions, setSessions] = useState <{[sessionId: string]: ISession} | null>(null);

  useEffect(() => {
    realtimeDatabase()
      .ref('sessions')
      .orderByChild('competitionId')
      .equalTo(competitionId)
      .once('value')
      .then(datasnapshot => {
        setSessions(datasnapshot.val())
      })
  }, [competitionId])

  return sessions;
}

export default useSessions;