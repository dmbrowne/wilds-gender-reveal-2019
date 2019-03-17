import React, { Component } from 'react'
import { realtimeDatabase } from '../../firebase';
import gameconfig from '../../gameconfig';
import { withSession } from '../../providers/session';
import { IWithSessionContext } from '../../providers/session/session-consumer';
import { withTeam } from '../../providers/team';
import { IWithTeamContext } from '../../providers/team/team-consumer';
import compose from '../../utils/compose';
import withGameplaySession, { IWithGameplaySessionContext } from '../../providers/gameplay-session/consumer';

interface IProps extends IWithSessionContext, IWithTeamContext, IWithGameplaySessionContext {}

class AutoSessionComponent extends Component<IProps> {
  componentDidMount () {
    const { sessionContext } = this.props;
    realtimeDatabase()
      .ref('sessions')
      .orderByChild('competitionId')
      .equalTo(gameconfig.competitionId)
      .limitToFirst(1)
      .once('value')
      .then(datasnapshot => {
        const sessionId = Object.keys(datasnapshot.val())[0]
        if (sessionId) {
          sessionContext.setCurrentSession({
            id: sessionId,
            ...datasnapshot.val(),
          })
          this.getGameplaySession(sessionId)
        }
      })
  }

  getGameplaySession(sessionId: string) {
    const { gameplaySessionContext, teamContext } = this.props;
    const errorPrefix = 'Cannot auto-select a session';
  
    if (!teamContext.selectedTeam || !teamContext.selectedTeam.id) {
      throw new Error(`${errorPrefix}, team has not be selected`)
    }

    const teamId = teamContext.selectedTeam.id;
    realtimeDatabase()
      .ref(`sessionTeams/${sessionId}/${teamId}`)
      .once('value')
      .then((querysnapshot) => querysnapshot.val())
      .then((gameplaySessionId: string | null) => {
        if (!gameplaySessionId) {
          throw new Error(`${errorPrefix}, team does not have gameplaySession for this session`);
        }
        return realtimeDatabase().ref(`gameplaySessions/${gameplaySessionId}`).once('value');
      })
      .then(gameplaySession => {
        if (!gameplaySession.exists()) {
          throw new Error(`${errorPrefix}, gameplay session cannot be found with key: ${gameplaySession.key}`);
        }
        gameplaySessionContext.setGameplaySession({ id: gameplaySession.key, ...gameplaySession.val() })
      })
  }
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default compose(
  withTeam,
  withSession,
  withGameplaySession,
)(AutoSessionComponent);