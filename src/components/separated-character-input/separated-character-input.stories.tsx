import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import SeparatedCharacterInput from './separated-character-input';
import { TextField } from '@material-ui/core';

storiesOf('Components|separated-character-input', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SeparatedCharacterInput
      defaultValue={text('value', 'ans')}
      maxLength={6}
      renderCharacterInput={(character, onChange, { ref, ...inputProps}) => (
        <TextField inputRef={ref} value={character} onChange={onChange} inputProps={{...inputProps}} />
      )}
    />
  ));
