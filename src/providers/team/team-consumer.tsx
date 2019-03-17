import * as React from 'react'
import { Subtract } from 'utility-types';

import TeamContext, { IContext } from './team-context';

export interface IWithTeamContext {
  teamContext: IContext;
}

export default function withTeam<P extends IWithTeamContext>(Component: React.ComponentType<P>) {
  return class TeamConsumer extends React.Component<Subtract<P, IWithTeamContext>, any> {
    render() {
      return (
        <TeamContext.Consumer>
          {(teamContext) => <Component {...this.props as P} teamContext={teamContext} />}
        </TeamContext.Consumer>
      )
    }
  }
}