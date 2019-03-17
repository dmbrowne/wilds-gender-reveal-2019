import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ScavengerHunt from './scavenger-hunt';
import ThemeProvider from '../../providers/theme/provider';
import { number, array, object } from '@storybook/addon-knobs';

const clues = [
  {
    letters: ['L', 'C'],
    unlocked: true,
    code: '9327',
    answer: 'officiis',
    riddle: 'Atque aliquid quia nesciunt, Hic animi eligendi sit neque sunt?'
  },
  {
    letters: ['A', 'B'],
    unlocked: false,
    code: '3471',
    answer: 'alias',
    riddle: 'Blanditiis rerum voluptatem neque?'
  },
];

storiesOf('Pages|scavenger hunt', module)
  .add('Mr default', () => {
    return (
      <ThemeProvider theme="mr">
        <ScavengerHunt
          totalClues={number('totalClues', 5)}
          cluesFound={number('cluesFound', 2)}
          clues={object('clues', clues)}
          opposingTeam={{
            totalClues: number('OpposingTeam TotalClues', 5),
            cluesFound: number('OpposingTeam CluesFound', 1),
          }}
        />
      </ThemeProvider>
    )
  })
  .add('Mrs default', () => {
    return (
      <ThemeProvider theme="mrs">
        <ScavengerHunt
          totalClues={number('totalClues', 5)}
          cluesFound={number('cluesFound', 2)}
          clues={array('clues', clues)}
          opposingTeam={{
            totalClues: number('OpposingTeam TotalClues', 5),
            cluesFound: number('OpposingTeam CluesFound', 1),
          }}
        />
      </ThemeProvider>
    )
  })