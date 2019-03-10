import * as React from 'react';
import styles from './solve-mystery-word-header.module.css';

import forestBg from './assets/forest-background.jpg';
import { withTheme } from '@material-ui/core';

function SolveMysteryWordHeaderComponent({ theme }) {
  return (
    <aside className={styles.headerBg} style={{ backgroundImage: `url(${forestBg})` }}>
      <div className={styles.headerBgOverlay} style={{ backgroundColor: theme.palette.primary.dark }} />
    </aside>
  );
}

const SolveMysteryWordHeader = withTheme()(SolveMysteryWordHeaderComponent)

export default SolveMysteryWordHeader;