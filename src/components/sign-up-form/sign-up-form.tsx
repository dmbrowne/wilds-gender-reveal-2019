import * as React from 'react'
import { useState } from 'react'
import { TextField, Button, Paper, withTheme } from '@material-ui/core';
import { Error as ErrorIcon } from '@material-ui/icons';
import { ThemedComponentProps } from '@material-ui/core/styles/withTheme';

import { validateDisplayName, validatePassword, validateEmail, checkForExistingDisplayName, createUser } from './sign-up-utils';
import styles from './sign-up-form.module.css';

function SignUpForm({ theme }: ThemedComponentProps) {
  const [submitted, setSubmitted] = useState(false)
  const [displayName, updateDisplayName] = useState('')
  const [password, updatePassword] = useState('')
  const [email, updateEmail] = useState('')
  const [creationError, setCreateError] = useState('')

  const handleInputChange = (cb: (value: string) => any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    cb(e.target.value)
  };

  const errors = {
    displayName: validateDisplayName(displayName),
    password: validatePassword(password),
    email: validateEmail(email)
  }

  const onSubmit = () => {
    setSubmitted(true)
    const hasError = Object.entries(errors).some(([_, err]) => !!err);
    if (hasError) {
      return;
    }
    createNewUser();
  }

  const createNewUser = () => {
    checkForExistingDisplayName(displayName).then((exists) => {
      if (exists) throw new Error('Someone with that display name already exists');
      return createUser(email, password, displayName)
    })
    .catch(e => setCreateError(e.message))
  }

  return (
    <div className={styles.container}>
      {creationError &&
        <Paper className={styles.error} elevation={0} style={{ background: theme && theme.palette.error.dark }}>
          <ErrorIcon /> {creationError}
        </Paper>
      }
      <div className={styles.displayNameAndPassword}>
        <TextField
          required
          fullWidth
          margin="dense"
          label="Display Name"
          value={displayName}
          onChange={handleInputChange(updateDisplayName)}
          helperText={submitted && errors.displayName}
          error={submitted && !!errors.displayName}
        />
        <TextField
          required
          fullWidth
          margin="dense"
          label="Password"
          type="password"
          value={password}
          onChange={handleInputChange(updatePassword)}
          helperText={submitted && errors.password}
          error={submitted && !!errors.password}
        />
      </div>
      <TextField
        required
        fullWidth
        margin="dense"
        label="Email"
        type="email"
        helperText={submitted && errors.email ? errors.email : 'Only used if you forget your password!'}
        value={email}
        onChange={handleInputChange(updateEmail)}
        error={submitted && !!errors.email}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>Join</Button>
    </div>
  )
}

export default withTheme()(SignUpForm)