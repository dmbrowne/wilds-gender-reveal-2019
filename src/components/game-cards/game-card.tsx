import React from 'react'
import cx from 'classnames';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import styles from './game-cards.module.css';

interface IProps {
  title: string;
  renderTitle?: () => React.ComponentType;
  coverImage?: string;
  isComplete: boolean;
  isDisabled: boolean;
  onPlayClick?: () => any;
}

const GameCard: React.FC<IProps> = ({ title, renderTitle, coverImage, isComplete, isDisabled, onPlayClick }) => {
  return (
    <Card className={cx(styles.gameCard)}>
      <div className={styles.cardAddornment} style={coverImage ? {backgroundImage: `url(${coverImage})`} : {}}>
        <div className={styles.cardAddornmentOverlay} />
      </div>
      <CardContent style={{ flex: 1 }}>
        <header className={styles.cardHeader}>
          {!!renderTitle ? renderTitle() : title}
        </header>
        <footer className={styles.cardFooter}>
          <div className={styles.cardFooterStatus}>
            {isComplete && (
              <>
                <Check fontSize="small" color="primary" />
                <Typography variant="caption" inline color="primary">complete</Typography>
              </>
            )}
          </div>
          {!isDisabled && 
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={onPlayClick}
              children="Play"
            />
          }
        </footer>
      </CardContent>
    </Card>
  )
}

export default GameCard;