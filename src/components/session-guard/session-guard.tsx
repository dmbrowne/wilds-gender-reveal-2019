import * as React from 'react'
import { withRouter, RouteComponentProps, Route } from 'react-router';
import { withSession } from '../../providers/session';
import withGameplaySession, { IWithGameplaySessionContext } from '../../providers/gameplay-session/consumer';
import compose from '../../utils/compose';
import { IWithSessionContext } from '../../providers/session/session-consumer';
import Dashboard from '../../pages/home';

interface IProps extends 
  IWithGameplaySessionContext,
  IWithSessionContext,
  RouteComponentProps<{ sessionId: string, gameplaySessionId: string }>
{
  redirectUrl: string;
  Component: React.ComponentType<RouteComponentProps<{ sessionId: string, gameplaySessionId: string }>>
}

class SessionGuardComponent extends React.Component<IProps> {
  componentDidMount() {
    const { sessionId, gameplaySessionId } = this.props.match.params;
    const { gameplaySessionContext, sessionContext } = this.props;
    if (sessionId && gameplaySessionId) {
      sessionContext.currentSessionById(sessionId);
      gameplaySessionContext.setGameplaySessionById(gameplaySessionId);
    }
  }

  render() {
    const { history, redirectUrl, Component, gameplaySessionContext, sessionContext, ...props } = this.props;
    const { sessionId, gameplaySessionId } = this.props.match.params;

    if (!sessionId || !gameplaySessionId) {
      history.push(redirectUrl);
      return null;
    }

    return (
      <Component {...props} history={history} />
    )
  }
}

const SessionGuard = compose(withRouter, withSession, withGameplaySession)(SessionGuardComponent);

export default SessionGuard;