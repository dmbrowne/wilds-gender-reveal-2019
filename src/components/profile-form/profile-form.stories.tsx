import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileForm from './profile-form';

storiesOf('Components|Profile Form', module)
  .add('default', () => <ProfileForm displayName="Dazza" email="daryl@browne.com" />)