import React from 'react'
import useSessions from '../../hooks/sessions';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@material-ui/core';

import styles from './session-select.module.css';

const SessionSelect = () => {
  const sessions = useSessions();

  if (!sessions) {
    return (
      <div className={styles.loader}>
        <CircularProgress size={24} />
        <Typography>Fetching Sessions</Typography>
      </div>
    )
  }

  return (
    <div>
      <List>
        {sessions.map(session => (
          <ListItem>
            <ListItemText primary={session.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SessionSelect
