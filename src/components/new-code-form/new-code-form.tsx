import React, { useState } from 'react'
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { TextField, Button, CardContent, Card, CircularProgress, Typography } from '@material-ui/core';

import * as validators from '../../validators';
import { composeValidators } from '../../validators';
import { green } from '@material-ui/core/colors';
import { Check } from '@material-ui/icons';

const Input = ({ meta, input, ...props }: FieldRenderProps<HTMLInputElement>) => (
  <TextField
    variant="outlined"
    required
    {...props}
    {...input}
    error={meta.touched && meta.error}
    helperText={meta.touched && meta.error}
  />
);

const IncompleteButtonContent = ({ loading }: {loading: boolean}) => (
  <>
    Add
    {loading && <CircularProgress style={{ marginLeft: 8 }} size={16} />}
  </>
);

const CompleteButtonContent = () => (
  <>
    <Typography style={{color: green[900]}}>Done</Typography>
    <Check fontSize="small" style={{ marginLeft: 8, color: green[900] }} />
  </>
);


function NewCodeForm({ onSubmit }: { loading?: boolean, complete?: boolean, onSubmit: (values: any) => any}) {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const codeValidation = composeValidators(validators.required, validators.minLength(4));
  
  const onCodeSubmission = (values: any) => {
    setLoading(true);
    onSubmit(values)
      .then(() => {
        setLoading(false);
        setComplete(true);
      })
      .catch(() => {
        setLoading(false);
        setComplete(false);
      })
  }

  return (
    <Form
      onSubmit={onCodeSubmission}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="code"
            validate={codeValidation as any}
            label="Balloon Code"
            margin="normal"
            maxLength={4}
            component={Input}
          />
          <div style={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || (pristine || invalid)}
            >
              {complete
                ? <CompleteButtonContent />
                : <IncompleteButtonContent loading={!!loading} />
              }
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default NewCodeForm;