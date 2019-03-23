import React, { useState, useEffect } from "react";
import { realtimeDatabase } from "../firebase";

const useSessionGame = <P>(sessionId: string, gameId: string) => {
  const [sessionGame, setSessionGame] = useState<P | null>(null);
  const ref = !!sessionId && !!gameId && realtimeDatabase().ref(`sessionGames/${sessionId}_${gameId}`);

  const addDataToSessionGame = (keyPath: string, data: any) => {
    if (!ref) return;
    const reference = keyPath.split(".").reduce((accumRef, key) => {
      return accumRef.child(key);
    }, ref);
    reference.set(data);
  };

  useEffect(() => {
    if (!ref) return;
    realtimeDatabase().ref(`sessionGames/${sessionId}_${gameId}`);
    ref.on("value", datasnapshot => {
      setSessionGame(datasnapshot ? datasnapshot.val() : null);
    });
    return () => ref.off();
  }, [sessionId, gameId]);

  return { sessionGame, addDataToSessionGame };
};

export default useSessionGame;
