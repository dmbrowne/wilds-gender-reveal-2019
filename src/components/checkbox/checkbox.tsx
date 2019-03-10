import * as React from 'react'
import styles from './checkbox.module.css'
import { ReactComponent as Check} from './checkmark.svg';
import cx from 'classnames';

interface IProps {
  onClick: (e: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => any;
  checked: boolean;
  theme: 'mr' | 'mrs';
}

export default function Checkbox({ onClick, checked, theme }: IProps) {
  const checkStyle = theme === 'mr' ? styles.greenCheck : styles.purpleCheck;
  return (
    <span className={styles.root} onClick={onClick}>
      <input className={styles.nativeCheckbox} type="checkbox" checked={checked} onChange={() => null}/>
      <span className={styles.fauxCheckbox} />
      <span className={cx(styles.check, checkStyle)}>
        <Check />
      </span>
    </span>
  )
}
