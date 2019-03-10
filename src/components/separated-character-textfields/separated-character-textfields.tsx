import * as React from 'react'
import SeparatedCharacterInput from '../separated-character-input';
import { FilledInput } from '@material-ui/core';

import styles from './separated-character-textfields.module.css';

interface IProps {
  defaultValue?: string,
  maxLength: number,
  onChange: (val: string) => any;
  disabled?: boolean;
  spacing?: number;
}

export default function SeparatedCharacterTextFields({ defaultValue, maxLength, onChange, disabled, spacing }: IProps) {
  return (
    <SeparatedCharacterInput
      defaultValue={defaultValue}
      maxLength={maxLength}
      onChange={onChange}
      spacing={spacing}
      renderCharacterInput={(character, onchange, { ref, ...inputProps }) => (console.log(character), 
        <FilledInput
          key={`SeparatedCharacterInput`}
          disabled={disabled}
          classes={{
            root: styles.inputRoot,
            input: styles.textField,
          }}
          margin="dense"
          inputRef={ref}
          value={character}
          onChange={onchange}
          inputProps={{ ...inputProps }}
        />
      )}
    />
  )
}