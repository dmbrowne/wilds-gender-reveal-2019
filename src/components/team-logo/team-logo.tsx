import React from 'react'
import cx from 'classnames';

import Text from '../text';

import styles from './team-logo.module.css';

interface ILogoProps {
  theme: 'mr' | 'mrs';
  horizontal?: boolean;
  size?: 'small' | 'regular';
  dark?: boolean;
}

export default function BaseTeamLogo({ theme, horizontal, size = 'regular', dark }: ILogoProps) {
  const gemderTheme = theme === 'mr'
    ? styles.mrTheme
    : styles.mrsTheme;
  const labelStyle = cx(styles.teamLabel, {
    [styles.smallLabel]: size === 'small',
  });
  const genderStyle = cx(styles.gender, gemderTheme, {
    [styles.smallGender]: size === 'small',
  });
  return (
    <div className={cx(styles.logoRoot, {
      [styles.horizontalLogo]: horizontal,
      [styles.dark]: dark,
    })}>
      <Text element="div" variant="display2" className={labelStyle}>Team</Text>
      <Text
        element="div"
        variant="display1"
        className={genderStyle}
        children={theme}
      />
    </div>
  )
}
