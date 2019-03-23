import React from "react";
import { ReactComponent as BabyVector } from "./baby.svg";
import { Typography, Button, Color } from "@material-ui/core";

import styles from "./home.module.css";
import { withTeamTheme, IWithTeamThemeProps } from "../../providers/theme";
import CustomSnackbarContent from "../../components/snackbar/snackbar-content";
import { ChevronRightSharp } from "@material-ui/icons";
import compose from "../../utils/compose";
import HomeGameCard from "../../containers/home-game-card";
import withGameplaySession, { IWithGameplaySessionContext } from "../../providers/gameplay-session/consumer";
import { RouteComponentProps } from "react-router";
import { ISessionGame } from "../../providers/gameplay-session/context";
import useSessionGame from "../../hooks/game-session";
import { getFirebaseAuth } from "../../firebase";
import wozAv from "./woz-av-msg.png";

interface IProps extends IWithTeamThemeProps, IWithGameplaySessionContext, RouteComponentProps<{ sessionId: string }> {}

const GenderPredictionGame = ({
  colorPalette,
  onClick,
  selected
}: {
  selected: "boy" | "girl" | false;
  colorPalette: Color;
  onClick: () => any;
}) => {
  return (
    <div>
      {!selected && (
        <CustomSnackbarContent noShadow variant="warning" message="You haven't made your gender prediction yet" />
      )}
      <div className={styles.baby} style={{ color: colorPalette[300] }}>
        <BabyVector />
      </div>
      <Typography variant="caption" align="center" gutterBottom>
        {!selected
          ? `Before you are able to join in with the games, you need to make a prediction on what you think the new born's gender will be`
          : `So you think it's gonna be a ${selected}, well lets hurry up and find out!`}
      </Typography>
      <Button size="small" fullWidth color="primary" onClick={onClick}>
        {selected ? "View all predictions" : "Make your prediction"} <ChevronRightSharp />
      </Button>
    </div>
  );
};

const DashboardComponent: React.FC<IProps> = ({ teamThemeProps, gameplaySessionContext, history, match }) => {
  const user = getFirebaseAuth().currentUser;
  const { sessionId } = match.params;
  const { activeColorPalette } = teamThemeProps;
  const { gameplaySession, games } = gameplaySessionContext;
  const genderPredictionGameId = Object.keys(games).find(gameId => games[gameId].slug === "gender-prediction");
  const { sessionGame } = useSessionGame<any>(sessionId, genderPredictionGameId as any);
  const userSelectedGender = !!user && sessionGame && sessionGame.votesByUserId && sessionGame.votesByUserId[user.uid];
  const allGamesComplete =
    !!gameplaySession && Object.entries(gameplaySession.games).every(([, game]) => !!game.completedAt);
  const sessiongames: ISessionGame[] = !!gameplaySession
    ? Object.entries(gameplaySession.games)
        .reduce(
          (accum, [id, game]) => {
            if (!game.displayHidden && !!game.unlockedAt) {
              return [...accum, { id, ...game }];
            }
            return accum;
          },
          [] as any
        )
        .sort((a: any, b: any) => a.order - b.order)
    : [];

  return (
    <div className={styles.container} style={{ background: activeColorPalette[100] }}>
      <Typography align="center" variant="display1" gutterBottom children="Welcome" />
      <Typography align="center" gutterBottom variant="body2">
        Suscipit voluptatibus aliquam. Qui qui ea adipisci nobis excepturi quibusdam distinctio dolores eveniet. Sit ea
        deleniti vel. Ipsam ea at voluptatem est aut commodi at.
      </Typography>
      <Typography variant="subheading" align="center" gutterBottom children="Let's have some fun!" />
      {!!genderPredictionGameId && (
        <GenderPredictionGame
          selected={userSelectedGender}
          colorPalette={activeColorPalette}
          onClick={() => history.push(`${match.url}/games/${genderPredictionGameId}`)}
        />
      )}
      {!!userSelectedGender &&
        sessiongames.map((game: ISessionGame) => (
          <HomeGameCard key={game.id} gameId={game.id} onPlay={() => history.push(`${match.url}/games/${game.id}`)} />
        ))}
      {allGamesComplete && (
        <a href="https://firebasestorage.googleapis.com/v0/b/wilds-gender-reveal-19.appspot.com/o/woz-ave.mp4?alt=media&token=474e3c68-87f3-4b9e-acb6-23e4d1b8895d">
          <img src={wozAv} style={{ maxWidth: "100%" }} />
        </a>
      )}
    </div>
  );
};

const Dashboard = compose(
  withGameplaySession,
  withTeamTheme
)(DashboardComponent);

export default Dashboard;
