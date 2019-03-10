import React from 'react'
import styles from './solve-mystery-word-hints.module.css';
import { blue, grey } from '@material-ui/core/colors';
import { Info } from '@material-ui/icons';
import { Typography, Card } from '@material-ui/core';

interface Hint {
  hint: string;
  unlocked: boolean;
}

interface IProps {
  hintsUsed: Hint[];
  totalHints: number;
}

export default function SolveMysteryWordHints({ hintsUsed, totalHints }: IProps) {
  return (
    <>
      <div className={styles.helpAlert}>
        <Info style={{ color: blue[700] }} />
        <Typography inline variant="caption" style={{ color: blue[400] }}>Too hard, Need help?</Typography>
      </div>
      <Typography variant="caption" style={{ color: grey[700] }} gutterBottom>
        Your team can use up to 3 hints to help solve the word. However for each hint unlocked, your team will lose
        <Typography inline variant="caption" color="error"> 1 point </Typography>
        from the total points your team will get from winning
      </Typography>
      <Typography component="p" gutterBottom>
        <Typography inline component="span" color="primary">{hintsUsed.length}</Typography> hints used of out of {totalHints}
      </Typography>
      {hintsUsed.length > 0 && (
        <Card style={{ margin: '8px 0', paddingTop: 8, paddingBottom: 16 }}>
          <Typography variant="subtitle1">Hints:</Typography>
          {hintsUsed.map(({ hint }) => <Typography variant="body2" style={{ color: grey[700] }}>{hint}</Typography>)}
        </Card>
      )}
    </>
  )
}
