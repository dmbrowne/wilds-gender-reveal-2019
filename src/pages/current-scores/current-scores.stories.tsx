import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './current-scores';
import { text, select } from '@storybook/addon-knobs';

storiesOf('Pages|Current Scores', module)
  .add('default', () => {
    const games = [
      {
        name: text('Game 1', 'Whats the mystery word?'),
        description: text('Game 1', 'description 1'),
        winningTeam: select('Game 1 winning team', ['mr', 'mrs'], 'mr'),
        unlocked: true,
      },
      {
        name: text('Game 2', 'Whats the mystery word?'),
        description: text('Game 2', 'description 2'),
        winningTeam: select('Game 2 winning team', ['mr', 'mrs'], 'mr'),
        unlocked: false,
      }
    ]
    return <Component games={games} />
  })