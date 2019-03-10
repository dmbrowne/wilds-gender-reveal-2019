import { Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';

const context = React.createContext({
  theme: createMuiTheme(),
  activeColorPalette: green,
  opposingColorPalette: purple,
  currentTeam: 'mr' as 'mr' | 'mrs',
  switchTheme: (theme: 'mr' | 'mrs') => {},
  getOpposingTeamThemeStyles: (theme?: 'mr' | 'mrs') => ({}) as Theme,
});

export default context;