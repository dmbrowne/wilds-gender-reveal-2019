import React from 'react'
import cx from 'classnames';
import { ReactComponent as BabyVector } from './baby.svg';
import { Typography, Button } from '@material-ui/core';

import styles from './home.module.css';
import { withTeamTheme, IWithTeamThemeProps } from '../../contexts/theme';
import { ScavengerHuntGameCard } from '../../components/game-cards';
import MysteryWordGameCard from '../../components/game-cards/mystery-word';
import CustomSnackbarContent from '../../components/snackbar/snackbar-content';
import { ChevronRightSharp } from '@material-ui/icons';

interface IProps extends IWithTeamThemeProps {
}

function Home({ teamThemeProps }: IProps) {
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
      <ScavengerHuntGameCard />
      <MysteryWordGameCard />
    </div>
  )
}

export default withTeamTheme(Home);