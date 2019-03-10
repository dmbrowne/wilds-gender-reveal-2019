import * as React from 'react';
import { Card, withStyles, withTheme, Theme } from '@material-ui/core';
import cx from 'classnames'

import styles from './letter-card.module.css';

interface IProps {
  size?: 'small' | 'regular' | 'large';
  backgroundColor?: string;
  theme: Theme;
}

export interface LetterContext {
  letter: string;
  backgroundColor: string;
}

const LetterCardComponent: React.FC<IProps> = ({ theme, children, size = 'regular',  backgroundColor = '#fff'}) => {
  const fontColor = theme.palette.getContrastText(backgroundColor);
  const StyledCard = withStyles({ root: { background: backgroundColor, color: fontColor } })(Card);
  return (
    <div style={{ display: 'inline-block' }}>
      <StyledCard
        className={cx(styles.card, {
          [styles.small]: size === 'small',
          [styles.regular]: size === 'regular',
          [styles.large]: size === 'large',
        })}
        children={children}
      />
    </div>
  )
}

const LetterCard = withTheme()(LetterCardComponent);

export default LetterCard;
