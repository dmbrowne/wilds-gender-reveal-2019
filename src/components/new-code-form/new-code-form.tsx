import React from 'react'
import { Form, Field, FieldRenderProps } from 'react-final-form';
import { TextField, Button, CardContent, Card, CircularProgress, Typography } from '@material-ui/core';

import * as validators from '../../validators';
import { composeValidators } from '../../validators';
import { green } from '@material-ui/core/colors';
import { Check } from '@material-ui/icons';

const onSubmit = (values: any) => {
  console.table(values);
}

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

function NewCodeForm({ loading, complete }: { loading?: boolean, complete?: boolean }) {
  const codeValidation = composeValidators(validators.required, validators.minLength(4));
  return (
    <Form
      onSubmit={onSubmit}
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