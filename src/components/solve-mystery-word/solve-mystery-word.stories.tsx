import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './solve-mystery-word';
import { object, text, boolean } from '@storybook/addon-knobs';
import ThemeProvider from '../../providers/theme/provider';

const Story = ({theme}: any) => {
  const hint1 = boolean('hint 1 unlocked', false);
  const hint2 = boolean('hint 2 unlocked', false);
  const hint3 = boolean('hint 3 unlocked', false);
  const hints = [
    {
      hint: 'Occaecati ea ratione repudiandae et quam nihil qui.',
      unlocked: hint1,
    },
    {
      hint: 'Occaecati ea ratione repudiandae et quam nihil qui.',
      unlocked: hint2,
    },
    {
      hint: 'Occaecati ea ratione repudiandae et quam nihil qui.',
      unlocked: hint3,
    },
  ]
  return (
    <ThemeProvider theme={theme}>
      <Component
        letters={object('letters', [
          {
            id: '0923',
            letter: 'H',
            backgroundColor: '#f782c8',
          },
          {
            id: '7235',
            letter: 'H',
            backgroundColor: '#f782c8',
          },
          {
            id: '45834',
            letter: 'w',
            backgroundColor: '#f782c8',
          },
          {
            id: '54950',
            letter: 's',
            backgroundColor: '#316549',
          },
          {
            id: '38325',
            letter: 'n',
            backgroundColor: '#566935',
          },
          {
            id: '11738',
            letter: 'a',
            backgroundColor: '#07283a',
          },
          {
            id: '14938',
            letter: 'r',
            backgroundColor: '#4d0117',
          },
          {
            id: '28190',
            letter: 'e',
            backgroundColor: '#0a5055',
          },
        ]) as any}
        answer={text('answer', 'answerhh')}
        solved={false}
        hints={hints}
      />
    </ThemeProvider>
  )
}
storiesOf('Pages|Solve mystery word', module)
  .add('Mr', () => <Story theme="mr" />)
  .add('Mrs', () => <Story theme="mrs" />)