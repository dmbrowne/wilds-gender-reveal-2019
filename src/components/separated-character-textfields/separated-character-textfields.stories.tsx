import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import Component from './separated-character-textfields';

storiesOf('Components|separated-character-textfields', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Component
      defaultValue={text('defaultValiue', 'ans')}
      maxLength={6}
      onChange={action('onChange')}
    />
  ));
