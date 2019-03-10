import * as React from 'react';
import { storiesOf } from '@storybook/react';
import NewCodeForm from './new-code-form';
import { withKnobs, boolean } from '@storybook/addon-knobs';

storiesOf('Components|New hint code form', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ padding: 16 }}>
      {story()}
    </div>
  ))
  .add('default', () =>
    <NewCodeForm loading={boolean('loading', false)} complete={boolean('complete', false)}/>
  )