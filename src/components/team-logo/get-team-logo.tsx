import * as React from 'react';
import { withTeamTheme } from '../../contexts/theme';
import MrLogo from './mr-logo';
import MrsLogo from './mrs-logo';
import { IWithTeamThemeProps } from '../../contexts/theme/withTeamTheme';

export default withTeamTheme(function GetTeamLogo<P extends IWithTeamThemeProps>({ teamThemeProps, ...props }: P) {
  return (
    teamThemeProps.currentTeam === 'mr'
      ? <MrLogo {...props} />
      : <MrsLogo {...props} />
  )
})