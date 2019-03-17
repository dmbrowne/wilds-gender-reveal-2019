import * as React from 'react';
import { Subtract } from 'utility-types';

import ThemeContext from './context';
import { Theme, Color } from '@material-ui/core';


export interface IThemeProps {
  theme: Theme;
  currentTeam: 'mr' | 'mrs'
  switchTheme: (theme: 'mr' | 'mrs') => any;
  getOpposingTeamThemeStyles: (theme?: 'mr' | 'mrs') => Theme;
  activeColorPalette: Color;
  opposingColorPalette: Color;
}

export interface IWithTeamThemeProps {
  teamThemeProps: IThemeProps;
}

export function withTeamTheme<P extends IWithTeamThemeProps>(Component: React.ComponentType<P>) {
  const withTeamTheme: React.FC<Subtract<P, IWithTeamThemeProps>> = (props) => {
    return (
      <ThemeContext.Consumer>
        {(themeprops) => <Component teamThemeProps={themeprops} {...props as P} />}
      </ThemeContext.Consumer>
    )
  }
  return withTeamTheme
}