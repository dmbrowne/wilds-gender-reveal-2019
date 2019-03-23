import React, { useState, useEffect } from "react";
import { CircularProgress, Dialog } from "@material-ui/core";
import withGameplaySession, { IWithGameplaySessionContext } from "../../providers/gameplay-session/consumer";
import { IGame } from "../../providers/gameplay-session/context";
import { RouteComponentProps, withRouter, matchPath } from "react-router";
import compose from "../../utils/compose";
import SolveMysteryWord from "../../components/solve-mystery-word";
import GameWon from "../../components/game-won";
import useGameComplete from "../../hooks/game-complete";

interface IProps
  extends IWithGameplaySessionContext,
    RouteComponentProps<{
      gameId: string;
      sessionId: string;
      gameplaySessionId: string;
    }> {
  game: IGame;
}

const Snowman: React.FC<IProps> = ({ game, gameplaySessionContext, match, history }) => {
  const { gameId } = match.params;
  const { markGameAsComplete, gameplaySession } = gameplaySessionContext;
  const pointsAvailable = (gameplaySession && gameplaySession.games[gameId].pointsAvailable) || 0;
  const [isCongratsShown, setIsCongratsShown] = useState<boolean>(false);
  const complete = !!gameplaySession && !!gameplaySession.games[gameId].completedAt;
  const matched = matchPath(history.location.pathname, {
    path: "/:sessionId/:gameplaySessionId"
  });
  const { sessionId, gameplaySessionId } = (matched && matched.params) || ({} as any);
  const onGoBack = () => history.push(`/${sessionId}/${gameplaySessionId}`);

  useEffect(() => {
    if (!!gameplaySession && !!gameplaySession.games[gameId].completedAt) {
      setIsCongratsShown(true);
    }
  }, [gameplaySessionContext.gameplaySession]);

  if (!game) {
    return <CircularProgress />;
  }

  return (
    <>
      <SolveMysteryWord
        onGoBack={onGoBack}
        letters={game.meta.letters}
        answer={game.answer}
        solved={complete}
        onSolveSuccess={() => markGameAsComplete(gameId)}
        hints={[]}
      />
      <Dialog open={isCongratsShown}>
        <GameWon onClose={() => setIsCongratsShown(false)} points={pointsAvailable} />
      </Dialog>
    </>
  );
};

export default compose(
  withRouter,
  withGameplaySession
)(Snowman);
