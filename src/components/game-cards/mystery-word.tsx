import React from 'react'
import cx from 'classnames';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import styles from './game-cards.module.css';
import LetterCard from '../letter-card';

const mysteryGameLetters = [
  [
    { letter: 'w', backgroundColor: '#0e0204' },
    { letter: 'h', backgroundColor: '#341377' },
    { letter: 'a', backgroundColor: '#1b7957' },
    { letter: 't', backgroundColor: '#0b6939' },
    { letter: 's', backgroundColor: '#442b10' },
  ],
  [
    { letter: 't', backgroundColor: '#422732' },
    { letter: 'h', backgroundColor: '#1b525c' },
    { letter: 'e', backgroundColor: '#5d2913' },
  ],
  [
    { letter: 'w', backgroundColor: '#465733' },
    { letter: 'o', backgroundColor: '#6f1475' },
    { letter: 'r', backgroundColor: '#74181c' },
    { letter: 'd', backgroundColor: '#377952' },
    { letter: '?', backgroundColor: '#564c10' },
  ],
]

export default function MysteryWordGameCard() {
  return (
    <Card className={cx(styles.gameCard)}>
      <div className={styles.wordgameCardAddornment}>
        <div className={styles.cardAddornmentOverlay} />
      </div>
      <CardContent style={{ flex: 1 }}>
        <header className={styles.cardHeader}>
          {mysteryGameLetters.map(word => (
            <span className={styles.wordgameCardTitleWord}>
              {word.map(letterContext => (
                <LetterCard
                  backgroundColor={letterContext.backgroundColor}
                  children={letterContext.letter}
                  size="small"
                />
              ))}
            </span>
          ))}
        </header>
        <footer className={styles.cardFooter}>
          <div className={styles.cardFooterStatus}>
            <Check fontSize="small" color="primary" />
            <Typography variant="caption" inline color="primary">complete</Typography>
          </div>
          <Button variant="outlined" size="small" color="secondary">Play</Button>
        </footer>
      </CardContent>
    </Card>
  )
}
