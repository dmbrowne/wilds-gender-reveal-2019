import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import TeamSelect from './team-select';

storiesOf('Components|Team Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{height: '100vh'}}>
        <TeamSelect minHeight="60vh" showConfirm={select('showConfirm', ['mr', 'mrs', false as any], false)} />
      </div>
    )
  });