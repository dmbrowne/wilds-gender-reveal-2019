import React from 'react';
import { storiesOf } from '@storybook/react';
import TeamAvatar from './team-avatar';

storiesOf('Components|team-avatar', module)
  .add('Mr', () => <TeamAvatar theme="mr" />)
  .add('Mrs', () => <TeamAvatar theme="mrs" />)