import * as React from "react";
import { useState, useEffect } from "react";
import cx from "classnames";

import TeamSelectTile from "../team-select-tile";
import styles from "./team-select.module.css";
import gameconfig from "../../gameconfig";

interface IProps {
  selectedTeamId?: string;
  onSelectTeam: (team: any) => any;
  // onUnconfirm?: () => any;
  showConfirm?: string | false;
  // bodyContent?: () => React.ReactNode;
  // minHeight: string | number;
  teams: Array<{
    id: string;
    theme: "mr" | "mrs";
    [key: string]: any;
  }>;
}

export default function TeamSelect({
  selectedTeamId,
  teams,
  onSelectTeam,
  showConfirm
}: // bodyContent,
// minHeight
IProps) {
  const chooseTeam = (team: any) => {
    const newTeam = selectedTeamId === team.id ? null : team;
    onSelectTeam(newTeam);
  };

  const widthStyle = (teamId: string) =>
    cx(styles.widthAnimation, {
      [styles.hidden]: !!showConfirm && showConfirm !== teamId
    });

  const teamTileProps = {
    hideCheckbox: !!showConfirm,
    hideLabel: !!showConfirm
  };

  return (
    <div className={styles.teamSelect}>
      {teams.map(team => (
        <div key={team.id} className={widthStyle(team.id)}>
          <div
            className={cx(styles.opacityLayer, {
              [styles.selected]: selectedTeamId === team.id
            })}
          >
            <TeamSelectTile
              theme={team.theme}
              onSelect={() => chooseTeam(team)}
              selected={selectedTeamId === team.id}
              {...teamTileProps}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
