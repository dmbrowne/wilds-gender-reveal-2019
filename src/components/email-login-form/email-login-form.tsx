import * as React from 'react'
import { Form, Field } from 'react-final-form';
import { TextField, Button } from '@material-ui/core';
import { required } from '../../validators';

import styles from './email-login-form.module.css';

const EmailLoginForm = ({ onSubmit }: { onSubmit: (values: { [key:string]: any }) => any }) => {
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form>
            <Field validate={required} name="email" render={({ input, meta }) => (
              <TextField
                label="Email"
                fullWidth
                {...input}
                margin="dense"
                helperText={meta.touched && meta.error}
                error={meta.touched && !!meta.error}
              />
            )} />
            <Field validate={required} name="password" render={({ input, meta }) => (
              <TextField
                type="password"
                label="Password"
                fullWidth
                {...input}
                margin="dense"
                helperText={meta.touched && meta.error}
                error={meta.touched && !!meta.error}
              />
            )} />
            <div className={styles.button}>
              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Sign in</Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default EmailLoginForm
