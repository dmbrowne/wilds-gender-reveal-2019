import React from 'react';
import { storiesOf } from '@storybook/react';
import AuthEntry from './auth-entry';
import { action } from '@storybook/addon-actions';

storiesOf('Components|Auth entry', module)
  .add('default', () => {
    return (
      <div style={{ height: '100vh' }}>
        <AuthEntry onSuccess={action('success')} />
      </div>
    )
  });