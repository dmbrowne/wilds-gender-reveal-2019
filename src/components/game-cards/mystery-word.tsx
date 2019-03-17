import React from 'react'
import cx from 'classnames';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import styles from './game-cards.module.css';
import LetterCard from '../letter-card';

const mysteryGameLetters = [
  [
    { id: 0, letter: 'w', backgroundColor: '#0e0204' },
    { id: 1, letter: 'h', backgroundColor: '#341377' },
    { id: 2, letter: 'a', backgroundColor: '#1b7957' },
    { id: 3, letter: 't', backgroundColor: '#0b6939' },
    { id: 4, letter: 's', backgroundColor: '#442b10' },
  ],
  [
    { id: 12, letter: 't', backgroundColor: '#422732' },
    { id: 11, letter: 'h', backgroundColor: '#1b525c' },
    { id: 10, letter: 'e', backgroundColor: '#5d2913' },
  ],
  [
    { id: 9, letter: 'w', backgroundColor: '#465733' },
    { id: 8, letter: 'o', backgroundColor: '#6f1475' },
    { id: 7, letter: 'r', backgroundColor: '#74181c' },
    { id: 6, letter: 'd', backgroundColor: '#377952' },
    { id: 5, letter: '?', backgroundColor: '#564c10' },
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
          {mysteryGameLetters.map((word, idx) => (
            <span key={idx} className={styles.wordgameCardTitleWord}>
              {word.map(letterContext => (
                <LetterCard
                  key={letterContext.id}
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
