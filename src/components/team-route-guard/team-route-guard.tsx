import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withUser, IWithUserContext } from '../../providers/user/user-consumer';
import { CircularProgress } from '@material-ui/core';
import gameconfig from '../../gameconfig';
import withTeam, { IWithTeamContext } from '../../providers/team/team-consumer';
import { getFirestore, getFirebaseAuth } from '../../firebase';
import { User } from 'firebase';

interface IProps extends IWithUserContext, IWithTeamContext, RouteComponentProps {
  redirectUrl: string;
}

class TeamRouteGuardComponent extends React.Component<IProps, { fetchingTeam: boolean }> {
  state = {
    fetchingTeam: false,
  }

  competitionRef = getFirestore('competitions').doc(gameconfig.competitionId);

  getUserTeamId(userId: string) {
    return this.competitionRef
      .collection('teamMembers')
      .where('user', '==', getFirestore('users').doc(userId))
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data().team.id;
        }
        return null;
      })
  }

  getTeam(teamId: string) {
    return this.competitionRef
      .collection('teams')
      .doc(teamId)
      .get()
      .then(documentSnapshot => {
        if (!documentSnapshot.exists) {
          return null;
        }
        return {
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        }
      })
  }

  async getUserTeam(user: User) {
    const teamId = await this.getUserTeamId(user.uid)
    if (!teamId) throw Error('no teamId found for user');
    const team = await this.getTeam(teamId);
    if (!team) throw Error('team doesnt exist under competition');
    return team;
  }

  componentDidMount() {
    const { redirectUrl, history, teamContext } = this.props;
    const user = getFirebaseAuth().currentUser;
    if (!teamContext.selectedTeam && user) {
      this.setState({ fetchingTeam: true });
      this.getUserTeam(user)
        .then(team => {
          teamContext.setSelectedTeam(team);
          this.setState({ fetchingTeam: false });
        })
        .catch((e: Error) => {
          console.info(e.message);
          history.push(redirectUrl);
        })
    }
  }

  render() {
    const { fetchingTeam } = this.state;
    const { teamContext, children } = this.props;

    if (fetchingTeam) {
      return <CircularProgress />
    }

    if (teamContext.selectedTeam) {
      return children;
    }

    return null;
  }
}

const TeamRouteGuard = withRouter(withUser(
  withTeam(TeamRouteGuardComponent)
))

export default TeamRouteGuard;
