import React from 'react'
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { TextField, Paper, Button } from '@material-ui/core';

import * as validators from '../../validators';
import { composeValidators } from '../../validators';
import styles from './profile-form.module.css';

interface IProps {
  displayName: string;
  email: string;
}

const onSubmit = (values: any) => {
  console.table(values);
}

const Input = ({ meta, input, ...props }: FieldRenderProps<HTMLInputElement>) => (
  <TextField
    fullWidth
    required
    {...props}
    {...input}
    error={meta.touched && meta.error}
    helperText={meta.touched && meta.error}
  />
);

function ProfileForm({ displayName, email }: IProps) {
  const emailValidation = composeValidators(validators.required, validators.email);
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ displayName, email }}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Paper className={styles.card}>
            <Field
              name="displayName"
              validate={validators.required}
              label="Display Name"
              margin="normal"
              component={Input}
            />
            <Field
              name="email"
              validate={emailValidation as any}
              type="email"
              label="Email"
              margin="normal"
              component={Input}
            />
            <div className={styles.submitButtonContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={pristine || invalid}
                children="Save"
              />
            </div>
          </Paper>
        </form>
      )}
    />
  )
}

export default ProfileForm;