import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import SignUpForm from './sign-up-form';

storiesOf('Components|Sign Up Form', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ height: '100vh' }}>
        <SignUpForm />
      </div>
    )
  });