import React from 'react'
import GenderLogo from '../../components/team-logo/team-logo';
import { withTeamTheme } from '../../contexts/theme';
import { IWithTeamThemeProps } from '../../contexts/theme/withTeamTheme';
import HintCodeCard from '../../components/hint-code-card/hint-code-card';
import { AppBar, Toolbar, IconButton, Typography, Fab, LinearProgress, Divider, Button } from '@material-ui/core';
import { Menu, Add } from '@material-ui/icons';

import styles from './scavenger-hunt.module.css';
import ActionButtonModal from '../../components/action-button-modal';
import NewCodeForm from '../../components/new-code-form/new-code-form';
import TeamAvatar from '../../components/team-avatar';

interface IProps extends IWithTeamThemeProps {
  totalClues: number;
  cluesFound: number;
  opposingTeam: {
    totalClues: number;
    cluesFound: number;
  }
}

function ScavengerHunt({ teamThemeProps, totalClues, cluesFound, opposingTeam, clues }: IProps) {
  const { palette: { primary: oppositePrimaryColor } } = teamThemeProps.getOpposingTeamThemeStyles();
  const oppositeTeam = teamThemeProps.currentTeam === 'mr' ? 'mrs' : 'mr'
  const allCluesFound = totalClues === cluesFound;
  const allCluesSolved = clues.every(clue => clue.unlocked);
  return (
    <div className={styles.container}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit">
            <Menu fontSize="small" />
          </IconButton>
          <Typography variant="h6" color="inherit">
            The Scavenger Hunt
          </Typography>
        </Toolbar>
      </AppBar>
      <aside className={styles.opposingScores}>
        <Typography variant="caption" style={{ color: oppositePrimaryColor.main, marginRight: 8 }}>
          {opposingTeam.cluesFound} of {opposingTeam.totalClues} clues found
        </Typography>
        <TeamAvatar theme={oppositeTeam} progress={(opposingTeam.cluesFound / opposingTeam.totalClues) * 100} />
      </aside>
      <Divider variant="middle" style={{ marginTop: 8, marginBottom: 8 }} />
      <section className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <GenderLogo horizontal size="small" theme={teamThemeProps.currentTeam} dark />
          </div>
          <div>
            <div style={{
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', width: 150 , margin: 'auto', textAlign: 'center' }}>
              {allCluesFound
                ? (
                  <div>
                    <Typography color={allCluesSolved ? 'primary' : 'default'} component="span" variant="h6">All clues {allCluesSolved ? 'solved!' : 'found'}</Typography>
                    {allCluesSolved
                      ? <Button color="primary" variant="outlined" size="small">Continue</Button>
                      : <Typography color="primary" component="span" variant="caption">solve the riddles to continue</Typography>
                    }
                  </div>
                )
                : (
                  <>
                    <Typography color="primary" inline component="span" variant="h4">{cluesFound}</Typography>
                    <Typography inline component="span" variant="subtitle1" style={{ lineHeight: '16px' }}>clues found<br/>out of</Typography>
                    <Typography inline component="span" variant="h4">{totalClues}</Typography>
                  </>
                )
              }
            </div>
            <div style={{ width: 200, margin: '8px auto' }}>
              <LinearProgress variant="determinate" value={(cluesFound/totalClues) * 100} />
            </div>
          </div>
        </div>
        <div className={styles.hintCards}>
          {clues.map(clue => (
            <HintCodeCard className={styles.hintCard} {...clue} />
          ))}
        </div>
        <Button color="primary" variant="contained" size="large" fullWidth>Continue</Button>
      </section>
      {allCluesSolved && (
        <ActionButtonModal
          title="Add a new hint"
          textContent="Enter the code to get a riddle..."
          actions={{
            render: () => <div style={{ marginTop: 16 }}><NewCodeForm /></div>
          }}
        />
      )}
    </div>
  )
}

export default withTeamTheme(ScavengerHunt);