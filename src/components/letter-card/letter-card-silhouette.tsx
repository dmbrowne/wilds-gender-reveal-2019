import * as React from 'react';
import { Card, withStyles, withTheme, Theme } from '@material-ui/core';
import cx from 'classnames'

import styles from './letter-card.module.css';

interface IProps {
  small?: boolean;
  backgroundColor?: string;
}

export default function LetterCardSilhouette({ small, backgroundColor = '#fff' }: IProps) {
  return (
    <div
      style={{ backgroundColor }}
      className={cx(styles.silhouette, {
        [styles.small]: small,
        [styles.regular]: !small,
      })}
      children={'_'}
    />
  )
}

