import React from 'react';
import { storiesOf } from '@storybook/react';
import ChalkboardGuess from './chalkboard-guess';
import { action } from '@storybook/addon-actions';
import { number, text, color, object } from '@storybook/addon-knobs';

storiesOf('Components|chalkboard-guess', module)
  .add('default', () => {
    const maxLength = number('maxLength', 4);
    return (
      <ChalkboardGuess
        onDelete={(val) => ({})}
        getItemKey={(item) => item.id}
        letters={object('letters', [
          {
            id: '32e423',
            letter: 'a',
            backgroundColor: '#fff',
          }
        ])}
        maxLength={maxLength}
        onSelectIdx={action('selectedIdx')}
      />
    )
})