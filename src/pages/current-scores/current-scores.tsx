import React from 'react'
import { MrLogo, MrsLogo } from '../../components/team-logo';
import styles from './current-scores.module.css';
import { Typography, Card, CardContent } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';
import Chalkboard from '../../components/chalkboard';

interface IGame {};

export default function CurrentScores({ games }) {
  return (
    <Chalkboard className={styles.root}>
      <div className={styles.backfills}>
        <div style={{ opacity: 0.1, background: `linear-gradient(to bottom, ${green[700]} 0%,${green[200]} 100%)` }} />
        <div style={{ opacity: 0.1, background: `linear-gradient(to bottom, ${purple[700]} 0%,${purple[200]} 100%)` }} />
      </div>
      <div className={styles.content}>
        <header className={styles.teamlogos}>
          <MrLogo />
          <MrsLogo />
        </header>
        <main className={styles.main}>
          <header className={styles.title}>
            <Typography variant="display1" align="center" style={{ fontFamily: 'Fredericka the Great', color: '#fff'}}>Games</Typography>
          </header>
          <div className={styles.games}>
            {games.map(game => (
              <Card className={styles.gameCard}>
                <div className={styles.gameCardScore} style={{ backgroundColor: green[900]}}>15</div>
                <CardContent className={styles.gameCardContent}>
                  <Typography variant="subtitle1">{game.name}</Typography>
                  <Typography variant="body2">{game.description}</Typography>
                </CardContent>
                <div className={styles.gameCardScore} style={{ backgroundColor: purple[900] }}>10</div>
              </Card>
            ))}
          </div>
        </main>
        <section className={styles.tallySection}>
          <div>eec</div>
          <div>eec</div>
        </section>
      </div>
    </Chalkboard>
  )
}
