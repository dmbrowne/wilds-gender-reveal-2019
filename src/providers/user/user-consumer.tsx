import * as React from 'react'
import { Subtract } from 'utility-types';

import UserContext from './user-context';
import { IContext } from './user-provider';

export interface IWithUserContext {
  userContext: IContext;
}

export function withUser<P extends IWithUserContext>(Component: React.ComponentType<P>) {
  return class UserConsumer extends React.Component<Subtract<P, IWithUserContext>, any> {
    render() {
      return (
        <UserContext.Consumer>
          {(userContext) => <Component {...this.props as P} userContext={userContext} />}
        </UserContext.Consumer>
      )
    }
  }
}
export default withUser;