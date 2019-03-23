import { useState, useEffect } from "react";
import { realtimeDatabase } from "../firebase";

interface ISession {
  name: string;
  competitionId: string;
  completedAt: Date | false;
  type: "head-to-head" | "solo";
}

const useSessions = (competitionId: string, sessionType?: string) => {
  const [sessions, setSessions] = useState<{ [sessionId: string]: ISession } | null>(null);

  useEffect(() => {
    realtimeDatabase()
      .ref("sessions")
      .orderByChild("competitionId")
      .equalTo(competitionId)
      .once("value")
      .then(datasnapshot => {
        if (sessionType) {
          const filterdSessions = Object.entries(datasnapshot.val()).reduce(
            (accum, [id, session]: [string, any]) => {
              if (session.type === sessionType) {
                return {
                  ...accum,
                  [id]: session
                };
              }
              return accum;
            },
            {} as any
          );
          return setSessions(filterdSessions);
        }
        setSessions(datasnapshot.val());
      });
  }, [competitionId]);

  return sessions;
};

export default useSessions;
