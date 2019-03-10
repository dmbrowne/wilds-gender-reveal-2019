import * as React from 'react';
import { storiesOf } from '@storybook/react'
import { withKnobs, array, text, color, object, boolean } from '@storybook/addon-knobs';
import HintCodeCard from './hint-code-card';

storiesOf('Components|hint-code-card', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div style={{ padding: 16 }}>{story()}</div>
  ))
  .add('default', () => (
    <HintCodeCard
      unlocked={boolean('unlocked', false)}
      code={text('code', '1493')}
      letters={[
        object('letter 1', {
          letter: text('letter', 'P'),
          backgroundColor: color('backgroundColor', '#fff'),
        }),
        object('letter 2', {
          letter: text('letter', 'P'),
          backgroundColor: color('backgroundColor', '#fff'),
        })
      ]}
      riddle={text('riddle', 'Et numquam laboriosam reprehenderit consequuntur quo fugiat?')}
      answer={text('answer', "blue house")}
    />
  ))
