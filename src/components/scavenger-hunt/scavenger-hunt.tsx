import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Fab, LinearProgress, Divider, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import { withTeamTheme } from '../../providers/theme';
import { IWithTeamThemeProps } from '../../providers/theme/withTeamTheme';

import GenderLogo from '../../components/team-logo/team-logo';
import HintCodeCard from '../../components/hint-code-card/hint-code-card';
import ActionButtonModal from '../../components/action-button-modal';
import NewCodeForm from '../../components/new-code-form/new-code-form';
import TeamAvatar from '../../components/team-avatar';
import { LetterContext } from '../../components/letter-card/letter-card';

import styles from './scavenger-hunt.module.css';

interface IProps extends IWithTeamThemeProps {
  totalClues: number;
  cluesFound: number;
  complete: boolean;
  onAddCode: (code: string) => any;
  clues: Array<{
    unlocked: boolean;
    code: string;
    meta:{
      letters: {
        [id: string]: LetterContext;
      }
    }
    answer: string;
    question: string;
    [key: string]: any;
  }>
  opposingTeam?: {
    totalClues: number;
    cluesFound: number;
  },
  onGuessSuccess: (questionId: string) => any;
}

function ScavengerHuntComponent({ teamThemeProps, totalClues, complete, cluesFound, opposingTeam, clues, onGuessSuccess, onAddCode }: IProps) {
  const { palette: { primary: oppositePrimaryColor } } = teamThemeProps.getOpposingTeamThemeStyles();
  const oppositeTeam = teamThemeProps.currentTeam === 'mr' ? 'mrs' : 'mr'
  const allCluesFound = totalClues === cluesFound;

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
      {!!opposingTeam && (
        <aside className={styles.opposingScores}>
          <Typography variant="caption" style={{ color: oppositePrimaryColor.main, marginRight: 8 }}>
            {opposingTeam.cluesFound} of {opposingTeam.totalClues} clues found
          </Typography>
          <TeamAvatar theme={oppositeTeam} progress={(opposingTeam.cluesFound / opposingTeam.totalClues) * 100} />
        </aside>
      )}
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
                    <Typography color={complete ? 'primary' : 'default'} component="span" variant="h6">All clues {complete ? 'solved!' : 'found'}</Typography>
                    {complete
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
          {clues
            .filter(({ unlockedAt }) => !!unlockedAt)
            .map(clue => {
              const letters = clue.meta && clue.meta.letters && Object.keys(clue.meta.letters).map(id => ({
                id,
                ...clue.meta.letters[id]
              })) || [{},{}]
              return (
                <HintCodeCard
                  {...clue}
                  letters={[letters[0], letters[1]]}
                  key={clue.id}
                  className={styles.hintCard}
                  completed={!!clue.completedAt}
                  onSubmit={(guess: string) => {
                    if (guess === clue.answer) {
                      onGuessSuccess(clue.id)
                    }
                  }}
                />
              )
            })
          }
        </div>
        <Button color="primary" variant="contained" size="large" fullWidth>Continue</Button>
      </section>
      {complete && (
        <ActionButtonModal
          title="Add a new hint"
          textContent="Enter the code to get a riddle..."
          actions={{
            render: () => (
              <div style={{ marginTop: 16 }}>
                <NewCodeForm onSubmit={({code}) => onAddCode(code)} />
              </div>
            )
          }}
        />
      )}
    </div>
  )
}

const ScavengerHunt = withTeamTheme(ScavengerHuntComponent);

export default ScavengerHunt