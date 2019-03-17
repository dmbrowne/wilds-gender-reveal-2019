import React, { useEffect } from 'react'
import cx from 'classnames';
import { ReactComponent as BabyVector } from './baby.svg';
import { Typography, Button } from '@material-ui/core';

import styles from './home.module.css';
import { withTeamTheme, IWithTeamThemeProps } from '../../providers/theme';
import { ScavengerHuntGameCard } from '../../components/game-cards';
import MysteryWordGameCard from '../../components/game-cards/mystery-word';
import CustomSnackbarContent from '../../components/snackbar/snackbar-content';
import { ChevronRightSharp } from '@material-ui/icons';
import compose from '../../utils/compose';
import { withSession } from '../../providers/session';
import { IWithSessionContext } from '../../providers/session/session-consumer';

interface IProps extends IWithTeamThemeProps, IWithSessionContext {
}

const DashboardComponent: React.FC<IProps> = ({ teamThemeProps, sessionContext }) => {
  const { activeColorPalette } = teamThemeProps;
  return (
    <div className={styles.container} style={{ background: activeColorPalette[100] }}>
      <Typography align="center" variant="display1" gutterBottom>Welcome</Typography>
      <Typography align="center" gutterBottom variant="body2">
        Suscipit voluptatibus aliquam. Qui qui ea adipisci nobis excepturi quibusdam distinctio dolores eveniet. Sit ea deleniti vel. Ipsam ea at voluptatem est aut commodi at.
      </Typography>
      <Typography variant="subheading" align="center" gutterBottom>
        Let's have some fun!
      </Typography>
      <CustomSnackbarContent noShadow variant="warning" message="You haven't made your gender prediction yet" />
      <div
        className={styles.baby}
        style={{ color: activeColorPalette[300] }}
      >
        <BabyVector />
      </div>
      <Typography variant="caption" align="center" gutterBottom>
        Before you are able to join in with the games, you need to make a prediction on what you think the new born's gender will be
      </Typography>
      <Button size="small" fullWidth color="primary">Make your prediction <ChevronRightSharp /></Button>
      {sessionContext.gameplaySession && Object.entries(sessionContext.gameplaySession.games).map(([gameId, game]) => {
        console.log(game)
        if (game.slug === 'scavenger-hunt') {
          return <ScavengerHuntGameCard />
        }
        if (game.slug === 'mystery-word') {
          return <MysteryWordGameCard />
        }
      })}
    </div>
  )
}

const Dashboard = compose(withSession, withTeamTheme)(DashboardComponent);

export default Dashboard; 