import React, { useState } from 'react'
import { CircularProgress, Dialog } from '@material-ui/core';
import withGameplaySession, { IWithGameplaySessionContext } from '../../providers/gameplay-session/consumer';
import { IGame } from '../../providers/gameplay-session/context';
import { RouteComponentProps, withRouter } from 'react-router';
import compose from '../../utils/compose';
import SolveMysteryWord from '../../components/solve-mystery-word';
import GameWon from '../../components/game-won';
import useGameComplete from '../../hooks/game-complete';

interface IProps extends IWithGameplaySessionContext, RouteComponentProps<{ gameId: string }> {
  game: IGame;
}

const Snowman: React.FC<IProps> = ({ game, gameplaySessionContext, match }) => {
  const { gameId } = match.params;
  const { markGameAsComplete, gameplaySession } = gameplaySessionContext;
  const pointsAvailable = gameplaySession && gameplaySession.games[gameId].pointsAvailable || 0;
  const [isCongratsShown, setIsCongratsShown] = useState<false | null>(null);
  const complete = useGameComplete(
    isCongratsShown === null
      ? gameplaySession && !!gameplaySession.games[gameId].completedAt || false
      : isCongratsShown
  );

  if (!game) {
    return <CircularProgress />
  }


  return (
    <>
      <SolveMysteryWord
        letters={game.meta.letters}
        answer={game.answer}
        solved={complete}
        onSolveSuccess={() => markGameAsComplete(gameId)}
        hints={[]}
      />
      <Dialog open={complete}>
        <GameWon onClose={() => setIsCongratsShown(false)} points={pointsAvailable} />
      </Dialog>
    </>
  )
}

export default compose(withRouter, withGameplaySession)(Snowman)
