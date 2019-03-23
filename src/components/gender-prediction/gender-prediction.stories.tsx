import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './gender-prediction';
import { text, select } from '@storybook/addon-knobs';
import ThemeProvider from '../../providers/theme/provider';

const TeamThemedStory = ({ team, ...props }: any) => (
  <ThemeProvider theme={team}>
    <Component {...props} />
  </ThemeProvider>
)

storiesOf('Pages|Gender Prediction', module)
  .add('MR', () => {
    return <TeamThemedStory team={'mr'} />
  })
  .add('MRS', () => {
    return <TeamThemedStory team={'mrs'} />
  })