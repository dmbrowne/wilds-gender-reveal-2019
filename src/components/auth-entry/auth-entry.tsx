import * as React from 'react'

import styles from './auth-entry.module.css';
import SignUpForm from '../sign-up-form';
import EmailLoginForm from '../email-login-form';
import { Button, Paper, withTheme, Typography } from '@material-ui/core';
import { checkForExistingDisplayName, createUser, emailSignIn } from './utils';
import { Error as ErrorIcon } from '@material-ui/icons';
import { ThemedComponentProps } from '@material-ui/core/styles/withTheme';
import userContext from '../../providers/user/user-context';
import { withUser } from '../../providers/user';
import { IWithUserContext } from '../../providers/user/user-consumer';
import { getFirebaseAuth } from '../../firebase';

interface IProps extends ThemedComponentProps, IWithUserContext {
  onSuccess: () => any;
}

const AuthEntry = withTheme()(({ theme, userContext, onSuccess }: IProps) => {
  const [entryMode, setEntryMode] = React.useState('signup');
  const [formError, setFormError] = React.useState<string | null>(null);

  const createNewUser = (email: string, password: string, displayName: string) => {
    setFormError(null)
    checkForExistingDisplayName(displayName)
      .then((exists: boolean) => {
        if (exists) throw new Error('Someone with that display name already exists');
        return createUser(email, password, displayName)
      })
      .then(() => onSuccess())
      .catch((e: Error) => setFormError(e.message))
  }

  const signIn = (email: string, password: string) => {
    emailSignIn(email, password)
      .then(() => onSuccess())
      .catch((e: Error) => setFormError(e.message))
  }

  const changeEntryMode = (mode: string) => {
    setFormError(null);
    setEntryMode(mode);
  }

  const user = getFirebaseAuth().currentUser;
  if (user) {
    return (<div className={styles.container}>
      <Typography gutterBottom>Already signed in as {user.displayName}</Typography>
      <Button variant="contained" onClick={() => onSuccess()}>Continue</Button>
    </div>)
  }

  return (
    <div className={styles.container}>
      {formError &&
        <Paper className={styles.error} elevation={0} style={{ background: theme && theme.palette.error.dark }}>
          <ErrorIcon /> {formError}
        </Paper>
      }
      {entryMode === 'signup' && (
        <>
          <SignUpForm onSubmit={createNewUser} />
          <Button size="small" onClick={() => changeEntryMode('signin')}>Already registered? sign in</Button>
        </>
      )}
      {entryMode === 'signin' && (
        <>
          <EmailLoginForm onSubmit={({ email, password }) => signIn(email, password)} />
          <Button size="small" onClick={() => changeEntryMode('signup')}>Haven't yet registered? sign up</Button>
        </>
      )}
    </div>
  )
})

export default withUser(AuthEntry)
