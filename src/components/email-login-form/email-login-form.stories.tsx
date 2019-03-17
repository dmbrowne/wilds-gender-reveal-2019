import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import EmailLoginForm from './email-login-form';
import { action } from '@storybook/addon-actions';

storiesOf('Components|Login Form', module)
  .add('default', () => {
    return (
      <div style={{ height: '100vh' }}>
        <EmailLoginForm onSubmit={action('submitted')} />
      </div>
    )
  });