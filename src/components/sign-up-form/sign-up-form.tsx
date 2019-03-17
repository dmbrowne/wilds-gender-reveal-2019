import * as React from 'react'
import { useState } from 'react'
import { TextField, Button } from '@material-ui/core';

import { validateDisplayName, validatePassword, validateEmail } from './sign-up-utils';
import styles from './sign-up-form.module.css';

interface IProps {
  onSubmit: (email: string, password: string, displayName: string) => any
}

function SignUpForm({ onSubmit }: IProps) {
  const [submitted, setSubmitted] = useState(false)
  const [displayName, updateDisplayName] = useState('')
  const [password, updatePassword] = useState('')
  const [email, updateEmail] = useState('')

  const handleInputChange = (cb: (value: string) => any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false);
    cb(e.target.value)
  };

  const errors = {
    displayName: validateDisplayName(displayName),
    password: validatePassword(password),
    email: validateEmail(email)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const hasError = Object.entries(errors).some(([_, err]) => !!err);
    if (hasError) {
      return;
    }
    onSubmit(email, password, displayName);
  }

  return (
    <div className={styles.container}>
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
      <div className={styles.button}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Join</Button>
      </div>
    </div>
  )
}

export default SignUpForm