import React from 'react'
import { storiesOf } from '@storybook/react';
import { text, withKnobs, color } from '@storybook/addon-knobs';

import LetterCard from './letter-card';
import LetterCardSilhouette from './letter-card-silhouette';

storiesOf('Components|Letter Card', module)
  .addDecorator((story) => (
    <div style={{ padding: 16 }}>
      {story()}
    </div>
  ))
  .add('default', () => (
    <LetterCard
      children={text('letter', 'l')}
      backgroundColor={color('backgroundColor', '#ffffff')}
    />
  ))
  .add('small', () => (
    <LetterCard
      size="small"
      children={text('letter', 'l')}
      backgroundColor={color('backgroundColor', '#ffffff')}
    />
  ))
  .add('large', () => (
    <LetterCard
      size="large"
      children={text('letter', 'l')}
      backgroundColor={color('backgroundColor', '#ffffff')}
    />
  ))
  .add('silhouette', () => (
    <LetterCardSilhouette
      backgroundColor={color('backgroundColor', '#ffffff')}
    />
  ));