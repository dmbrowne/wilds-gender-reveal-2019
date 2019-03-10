import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { withTeamTheme } from '../../contexts/theme';
import { IWithTeamThemeProps } from '../../contexts/theme/withTeamTheme';

import TeamSelect from '../../components/team-select';
import SignUpForm from '../../components/sign-up-form';
import SocialSignIn from '../../components/social-sign-in';
import styles from './team-select.module.css';

interface IProps extends IWithTeamThemeProps {};

function TeamSelectionPage({ teamThemeProps }: IProps) {
  const { switchTheme, currentTeam } = teamThemeProps;
  const [height, setHeight] = useState(window.innerHeight)
  const [selectedTeam, selectTeam] = useState()
  const [teamConfirmed, confirmTeam] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (window.innerHeight !== height) {
        setHeight(window.innerHeight)
      }
    }, 0)
  });

  const chooseTeam = (team: any) => {
    selectTeam(team);
    if (team !== currentTeam) {
      switchTheme(team);
    }
  }

  const confirmScreenContent = () => (
    <>
      <Button size="small" onClick={() => confirmTeam(false)} style={{ color: '#fff' }}>
        <ArrowBack /> Cancel
      </Button>
      <SignUpForm />
      <SocialSignIn title="Or sign in using one of these social providers" />
    </>
  );

  return (
      <div className={styles.container}>
        <TeamSelect
          minHeight={height}
          onSelectTeam={chooseTeam}
          showConfirm={teamConfirmed}
          bodyContent={() => (!!teamConfirmed
            ? confirmScreenContent()
            : null
          )}
        />
        {!!selectedTeam && !teamConfirmed &&
          <div className={styles.footerContent}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => confirmTeam(selectedTeam)}
            >
              Continue
            </Button>
          </div>
        }
      </div>
  )
}

export default withTeamTheme(TeamSelectionPage);
