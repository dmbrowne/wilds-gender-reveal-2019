import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ScavengerHunt from './scavenger-hunt';
import ThemeProvider from '../../providers/theme/provider';
import { number, array, object } from '@storybook/addon-knobs';

const clues = [
  {
    meta: {
      letters: {
        '34740': {
          letter: 'L',
          backgroundColor: '#cb0a7f',
        },
        '89770': {
          letter: 'C',
          backgroundColor: '#eede10',
        }
      }
    },
    unlockedAt: new Date().getTime(),
    completedAt: new Date().getTime(),
    code: '9327',
    answer: 'officiis',
    question: 'Atque aliquid quia nesciunt, Hic animi eligendi sit neque sunt?'
  },
  {
    letters: {
      '93wfeijo': {
        letter: 'A',
        backgroundColor: '#10ee8f',
      },
      'nbcuier8': {
        letter: 'B',
        backgroundColor: '#2010ee',
      }
    },
    unlockedAt: new Date().getTime(),
    completedAt: false,
    code: '3471',
    answer: 'alias',
    question: 'Blanditiis rerum voluptatem neque?'
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
          // opposingTeam={{
          //   totalClues: number('OpposingTeam TotalClues', 5),
          //   cluesFound: number('OpposingTeam CluesFound', 1),
          // }}
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
          // opposingTeam={{
          //   totalClues: number('OpposingTeam TotalClues', 5),
          //   cluesFound: number('OpposingTeam CluesFound', 1),
          // }}
        />
      </ThemeProvider>
    )
  })