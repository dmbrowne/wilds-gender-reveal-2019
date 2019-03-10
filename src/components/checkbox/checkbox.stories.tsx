import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './checkbox';

const DefaultCheckBox = ({ theme }: { theme: 'mr' | 'mrs'}) => {
  const [checked, onCheck] = useState(false);
  return (
    <div style={{ height: '97vh', width: '100%', background: '#ccc', padding: 50 }}>
      <Checkbox theme={theme} checked={checked} onClick={() => onCheck(!checked)} />
    </div>
  );
};

storiesOf('Components|Checkbox', module)
  .add('Mr Theme', () => <DefaultCheckBox theme="mr" />)
  .add('Mrs Theme', () => <DefaultCheckBox theme="mrs"/>);