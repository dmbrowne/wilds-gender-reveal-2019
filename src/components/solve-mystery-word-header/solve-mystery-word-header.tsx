import * as React from 'react';
import styles from './solve-mystery-word-header.module.css';

import forestBg from './assets/forest-background.jpg';
import { withTheme, WithTheme } from '@material-ui/core';

const SolveMysteryWordHeaderComponent: React.FC<WithTheme> = ({ theme }) => {
  return (
    <aside className={styles.headerBg} style={{ backgroundImage: `url(${forestBg})` }}>
      <div className={styles.headerBgOverlay} style={{ backgroundColor: theme.palette.primary.dark }} />
    </aside>
  );
}

const SolveMysteryWordHeader = withTheme()(SolveMysteryWordHeaderComponent)

export default SolveMysteryWordHeader;