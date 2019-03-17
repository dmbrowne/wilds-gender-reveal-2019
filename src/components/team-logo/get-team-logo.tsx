import * as React from 'react';
import { withTeamTheme } from '../../providers/theme';
import MrLogo from './mr-logo';
import MrsLogo from './mrs-logo';
import { IWithTeamThemeProps } from '../../providers/theme/withTeamTheme';

export default withTeamTheme(function GetTeamLogo<P extends IWithTeamThemeProps>({ teamThemeProps, ...props }: P) {
  return (
    teamThemeProps.currentTeam === 'mr'
      ? <MrLogo {...props} />
      : <MrsLogo {...props} />
  )
})