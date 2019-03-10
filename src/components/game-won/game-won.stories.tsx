import React from 'react';
import { storiesOf } from '@storybook/react';
import ThemeProvider from '../../contexts/theme/provider';
import { number } from '@storybook/addon-knobs';
import GameWon from './game-won';
import { Card } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

storiesOf('Components|game-won', module)
  .addDecorator(story => (
    <Card style={{margin: 16}}>{story()}</Card>
  ))
  .add('Mr Theme', () => (
    <ThemeProvider theme="mr">
      <GameWon points={number('points', 10)} onClose={action('closed')} />
    </ThemeProvider>
  ))
  .add('Mrs Theme', () => (
    <ThemeProvider theme="mrs">
      <GameWon points={number('points', 10)} onClose={action('closed')} />
    </ThemeProvider>
  ))