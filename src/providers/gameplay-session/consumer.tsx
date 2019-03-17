import * as React from 'react'
import { Subtract } from 'utility-types';

import GameplaySessionContext, { IContext } from './context';

export interface IWithGameplaySessionContext {
  gameplaySessionContext: IContext;
}

export default function withGameplaySession<P extends IWithGameplaySessionContext>(Component: React.ComponentType<P>) {
  return class SessionConsumer extends React.Component<Subtract<P, IWithGameplaySessionContext>, any> {
    render() {
      return (
        <GameplaySessionContext.Consumer>
          {(gameplaySessionContext) => <Component {...this.props as P} gameplaySessionContext={gameplaySessionContext} />}
        </GameplaySessionContext.Consumer>
      )
    }
  }
}