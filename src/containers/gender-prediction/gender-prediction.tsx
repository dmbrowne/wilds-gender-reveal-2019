import React from "react";
import GenderPrediction from "../../components/gender-prediction";
import { IWithSessionContext } from "../../providers/session/session-consumer";
import { RouteComponentProps, withRouter, matchPath } from "react-router";
import useSessionGame from "../../hooks/game-session";
import { IWithUserContext } from "../../providers/user/user-consumer";
import { getFirebaseAuth } from "../../firebase";
import { withTeam } from "../../providers/team";
import { IWithTeamContext } from "../../providers/team/team-consumer";
import compose from "../../utils/compose";

interface IProps
  extends IWithUserContext,
    IWithTeamContext,
    RouteComponentProps<{
      gameId: string;
      sessionId: string;
      gameplaySessionId: string;
    }> {
  rep: string;
}

interface IGenderVote {
  [userId: string]: string; //teamId
}
interface IGameVotes {
  votesByGender?: {
    girl?: IGenderVote;
    boy?: IGenderVote;
  };
  votesByUserId?: {
    [userId: string]: "girl" | "boy";
  };
}

const getVoters = (votes: IGenderVote = {} as any) =>
  Object.entries(votes).map(([userId, teamId]) => ({
    userId,
    teamId
  }));

const getVotes = (votes: IGameVotes["votesByGender"] = {} as any) => ({
  girl: getVoters(votes.girl),
  boy: getVoters(votes.boy)
});

const mapSessionGameDataToProps = (sessionData: IGameVotes = {}) => ({
  votes: getVotes(sessionData.votesByGender)
});

const GenderPredictionContainer: React.FC<IProps> = ({ match, teamContext, history }) => {
  const user = getFirebaseAuth().currentUser;
  const { selectedTeam } = teamContext;
  const { gameId } = match.params;
  const matched = matchPath(history.location.pathname, {
    path: "/:sessionId/:gameplaySessionId"
  });
  const { sessionId, gameplaySessionId } = (matched && matched.params) || ({} as any);
  const { sessionGame, addDataToSessionGame } = useSessionGame<IGameVotes>(sessionId, gameId);
  const { votes } = mapSessionGameDataToProps(sessionGame || undefined);
  let userVote = null;

  const selectGender = (gender: "boy" | "girl") => {
    if (!!user && !!selectedTeam) {
      addDataToSessionGame(`votesByGender.${gender}.${user.uid}`, selectedTeam.id);
      addDataToSessionGame(`votesByUserId.${user.uid}`, gender);
    }
  };

  if (!!sessionGame && !!user) {
    const ssnGame: IGameVotes = sessionGame;
    userVote = ssnGame.votesByUserId ? (ssnGame.votesByUserId[user.uid] as any) : null;
  }

  const onGoBack = () => history.push(`/${sessionId}/${gameplaySessionId}`);

  return (
    <GenderPrediction
      onGoBack={onGoBack}
      girlVotes={votes.girl}
      boyVotes={votes.boy}
      userVote={userVote}
      onSelect={selectGender}
    />
  );
};

export default compose(
  withRouter,
  withTeam
)(GenderPredictionContainer);
