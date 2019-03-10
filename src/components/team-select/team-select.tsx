import * as React from 'react';
import { useState, useEffect } from 'react';
import cx from 'classnames';

import TeamSelectTile from '../team-select-tile';
import styles from './team-select.module.css';

interface IProps {
  onSelectTeam?: (team: string) => any;
  onUnconfirm?: () => any;
  showConfirm?: 'mr' | 'mrs' | false;
  bodyContent?: () => React.ReactNode;
  minHeight: string | number;
}

export default function TeamSelect({ onSelectTeam, showConfirm, bodyContent, minHeight }: IProps) {
  const [selectedTeam, selectTeam] = useState('');
  const chooseTeam = (team: 'mr' | 'mrs') => {
    const newTeam = (selectedTeam === team) ? '' : team;
    selectTeam(newTeam);
  }

  useEffect(() => onSelectTeam && onSelectTeam(selectedTeam));

  const widthStyle = (team: string) => cx(styles.widthAnimation, {
    [styles.hidden]: !!showConfirm && showConfirm !== team,
  })

  const teamTileProps = {
    disabled: !!showConfirm,
    contentBody: bodyContent,
    minHeight,
  }

  return (
    <div className={styles.teamSelect}>
      <div className={widthStyle('mr')}>
        <div className={cx(styles.opacityLayer, { [styles.selected]: selectedTeam === 'mr' })}>
          <TeamSelectTile
            theme="mr"
            onSelect={() => chooseTeam('mr')}
            selected={selectedTeam === 'mr'}
            {...teamTileProps}
          />
        </div>
      </div>
      <div className={widthStyle('mrs')}>
        <div className={cx(styles.opacityLayer, { [styles.selected]: selectedTeam === 'mrs' })}>
          <TeamSelectTile
            theme="mrs"
            onSelect={() => chooseTeam('mrs')}
            selected={selectedTeam === 'mrs'}
            {...teamTileProps}
          />
        </div>
      </div>
    </div>
  )
}
