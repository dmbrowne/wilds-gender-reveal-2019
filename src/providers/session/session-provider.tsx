import React, { useState } from 'react'
import SessionContext from './session-context';

const SessionProvider: React.FC = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [gameplaySession, setGameplaySession] = useState(null);
  return (
    <SessionContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        gameplaySession,
        setGameplaySession,
      }}
      children={children}
    />
  )
}

export default SessionProvider
