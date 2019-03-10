import * as React from 'react';
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

export function withTeamTheme(Component: React.ReactType) {
  return function withTheme<Props>(props: Props) {
    return (
      <ThemeContext.Consumer>
        {(themeprops: IThemeProps) => <Component teamThemeProps={themeprops} {...props} />}
      </ThemeContext.Consumer>
    )
  }
}
