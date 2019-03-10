import React from 'react'
import cx from 'classnames';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import styles from './game-cards.module.css';

export default function ScavengerHuntGameCard() {
  return (
    <Card className={cx(styles.gameCard)}>
      <div className={styles.balloonCardAddornment}>
        <div className={styles.cardAddornmentOverlay} />
      </div>
      <CardContent style={{ flex: 1 }}>
        <header className={styles.cardHeader}>
          <h4 className={styles.scavengerHuntCardTitle}>
            The Scavenger hunt
            </h4>
        </header>
        <footer className={styles.cardFooter}>
          <div className={styles.cardFooterStatus}>
            <Check fontSize="small" color="primary"/>
            <Typography variant="caption" inline color="primary">complete</Typography>
          </div>
          <Button variant="outlined" size="small" color="secondary">Play</Button>
        </footer>
      </CardContent>
    </Card>
  )
}
