import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './home';
import { text, select } from '@storybook/addon-knobs';
import ThemeProvider from '../../providers/theme/provider';

const TeamThemedStory = ({ team, ...props }: any) => (
  <ThemeProvider theme={team}>
    <Component {...props} />
  </ThemeProvider>
)

storiesOf('Pages|Home', module)
  .add('MR', () => {
    return <TeamThemedStory team={'mr'} />
  })
  .add('MRS', () => {
    return <TeamThemedStory team={'mrs'} />
  })