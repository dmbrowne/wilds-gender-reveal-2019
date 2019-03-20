import React from 'react';
import GenderPrediction from '../../pages/gender-prediction';
import withGameplaySession, {
  IWithGameplaySessionContext,
} from '../../providers/gameplay-session/consumer';
import compose from '../../utils/compose';
import { withSession } from '../../providers/session';
import { IWithSessionContext } from '../../providers/session/session-consumer';

interface IProps extends IWithGameplaySessionContext, IWithSessionContext {}

const GenderPredictionContainer: React.FC<IProps> = ({
  // gameId,
  gameplaySessionContext,
  sessionContext,
}) => {
  return (
    <div>
      {/* <GenderPrediction girlVoteUserIds boyVoteUserIds userVote /> */}
    </div>
  );
};

export default compose(
  withSession,
  withGameplaySession,
)(GenderPredictionContainer);
