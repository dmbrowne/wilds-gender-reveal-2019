import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import cx from "classnames";

import { withTeamTheme } from "../../providers/theme";
import { IWithTeamThemeProps } from "../../providers/theme/withTeamTheme";

import TeamSelect from "../../components/team-select";
import styles from "./team-select.module.css";

import { RouteComponentProps } from "react-router";
import withTeam, { IWithTeamContext } from "../../providers/team/team-consumer";
import withUser, { IWithUserContext } from "../../providers/user/user-consumer";
import useTeams from "../../hooks/teams";
import { getFirebaseAuth } from "../../firebase";
import PlayerEntry from "./player-entry";

interface IProps
  extends IWithUserContext,
    IWithTeamThemeProps,
    IWithTeamContext,
    RouteComponentProps {}

const TeamSelectionPage: React.FC<IProps> = ({ teamContext, history }) => {
  const teams = useTeams();
  const [progressStage, setProgressStage] = useState("teamselect");
  const [height, setHeight] = useState(window.innerHeight);
  const [teamConfirmed, confirmTeam] = useState<string | false>();
  const teamContextId = (teamContext.selectedTeam && teamContext.selectedTeam.id) || "";

  const onSuccess = () => {
    teamContext.saveSelectedTeam().then(() => history.push("/"));
  };

  const getStageContent = () => {
    switch (progressStage) {
      case "entry":
        return (
          <PlayerEntry
            onSuccess={() => onSuccess()}
            onBackClick={() => {
              setProgressStage("teamselect");
              confirmTeam(false);
            }}
          />
        );
      case "teamselect":
      default:
        return null;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (window.innerHeight !== height) {
        setHeight(window.innerHeight);
      }
    }, 0);
  });

  const chooseTeam = (team: any) => {
    teamContext.setSelectedTeam(team);
  };

  if (!teams) {
    return <CircularProgress size={50} />;
  }

  return (
    <div className={styles.container}>
      <div className={cx(styles.bgImg, { [styles.blurred]: !!teamConfirmed })}>
        <TeamSelect
          teams={teams}
          selectedTeamId={teamContextId}
          onSelectTeam={chooseTeam}
          showConfirm={teamConfirmed}
        />
      </div>
      <div className={styles.content}>{getStageContent()}</div>
      {!!teamContextId && !teamConfirmed && (
        <div className={styles.footerContent}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              confirmTeam(teamContextId);
              setProgressStage("entry");
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default withUser(withTeam(withTeamTheme(TeamSelectionPage)));
