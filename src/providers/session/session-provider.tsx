import React, { useState } from 'react'
import SessionContext from './session-context';
import { realtimeDatabase } from '../../firebase';

const SessionProvider: React.FC = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);

  const currentSessionById = (id: string) => {
    realtimeDatabase().ref('sessions').child(id).once('value').then(datasnapshot => {
      setCurrentSession({
        id: datasnapshot.key,
        ...datasnapshot.val()
      })
    })
  }

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        currentSessionById,
      }}
      children={children}
    />
  )
}

export default SessionProvider
