import React, { useState } from "react";
import useSessions from "../../hooks/sessions";
import { CircularProgress, Typography, List, ListItem, ListItemText } from "@material-ui/core";

import styles from "./session-select.module.css";
import gameconfig from "../../gameconfig";
import withSession, { IWithSessionContext } from "../../providers/session/session-consumer";
import withTeam, { IWithTeamContext } from "../../providers/team/team-consumer";
import withGameplaySession, { IWithGameplaySessionContext } from "../../providers/gameplay-session/consumer";
import { RouteComponentProps } from "react-router";
import useTeamSession from "../../hooks/team-session";
import compose from "../../utils/compose";
import { getFirebaseAuth } from "../../firebase";

interface IProps extends RouteComponentProps, IWithSessionContext, IWithTeamContext, IWithGameplaySessionContext {}

const SessionSelectPage: React.FC<IProps> = ({ teamContext, gameplaySessionContext, history }) => {
  if (!teamContext.selectedTeam || !teamContext.selectedTeam.id) {
    console.error(`no team has beeen selected`);
    history.push("/"); // show modal with error and ok button to redirect
  }

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const teamId = teamContext.selectedTeam ? (teamContext.selectedTeam.id as string) : undefined;
  const sessions = useSessions(gameconfig.competitionId, "head-to-head");
  const teamSession = useTeamSession(selectedSessionId || undefined, teamId);

  if (!sessions) {
    return (
      <div className={styles.loader}>
        <CircularProgress size={25} />
        <Typography style={{ marginTop: 16 }}>Finding Sessions</Typography>
      </div>
    );
  }

  if (Object.keys(sessions).length === 0) {
    return <Typography>No session found with the compeitionId {gameconfig.competitionId}</Typography>;
  }

  if (teamSession) {
    gameplaySessionContext.setGameplaySessionById(teamSession.id);
    history.push(`/${selectedSessionId}/${teamSession.id}`);
    return null;
  }

  if (!!selectedSessionId) {
    return null;
  }

  if (sessions && Object.keys(sessions).length === 1) {
    setSelectedSessionId(Object.keys(sessions)[0]);
    return null;
  }

  return (
    <div style={{ padding: "16px 0" }}>
      <Typography variant="headline" align="center" gutterBottom>
        Select a session to join
      </Typography>
      <List>
        {sessions &&
          Object.entries(sessions).map(([sessionId, session]) => (
            <ListItem key={sessionId} button onClick={() => setSelectedSessionId(sessionId)}>
              <ListItemText primary={session.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

const SessionSelect = compose(
  withSession,
  withTeam,
  withGameplaySession
)(SessionSelectPage);

export default SessionSelect;
