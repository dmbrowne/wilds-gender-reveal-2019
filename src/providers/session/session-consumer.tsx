import * as React from 'react'
import { Subtract } from 'utility-types';

import SessionContext, { IContext } from './session-context';

export interface IWithSessionContext {
  sessionContext: IContext;
}

export default function withSession<P extends IWithSessionContext>(Component: React.ComponentType<P>) {
  return class SessionConsumer extends React.Component<Subtract<P, IWithSessionContext>, any> {
    render() {
      return (
        <SessionContext.Consumer>
          {(sessionContext) => <Component {...this.props as P} sessionContext={sessionContext} />}
        </SessionContext.Consumer>
      )
    }
  }
}