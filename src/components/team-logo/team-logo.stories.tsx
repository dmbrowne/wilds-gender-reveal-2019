import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MrLogo from './mr-logo';
import MrsLogo from './mrs-logo';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

storiesOf('Components|Team logos', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <div style={{ background: '#111', height: '100vmin', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {story()}
    </div>
  ))
  .add('Mr Logo', () => (
    <MrLogo
      horizontal={boolean('horizontal', false)}
      size={select('size', ['small', 'regular'], 'regular')}
    />
  ))
  .add('Mrs Logo', () => (
    <MrsLogo
      horizontal={boolean('horizontal', false)}
      size={select('size', ['small', 'regular'], 'regular')}
    />
  ))