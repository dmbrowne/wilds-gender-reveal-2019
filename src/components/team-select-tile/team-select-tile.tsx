import React, { ReactNode, ReactElement } from 'react'
import cx from 'classnames';
import ImageOverlay from '../image-overlay';
import Text from '../text';

import styles from './team-select-tile.module.css';
import Checkbox from '../checkbox';
import { MrLogo, MrsLogo } from '../team-logo';
import woz from './woz.jpeg'
import donnatina from './donna.jpeg'

interface IProps {
  theme: 'mr' | 'mrs';
  onSelect: () => any;
  selected: boolean;
  disabled?: boolean;
  contentBody?: () => ReactNode;
  minHeight: string | number;
}

const bgTheme = {
  mr: woz,
  mrs: donnatina,
}

const teamNames = {
  mr: 'MR.',
  mrs: 'MRS.',
}

export default function TeamSelectTile({ theme, onSelect, selected, disabled, contentBody, minHeight }: IProps) {
  return (
    <ImageOverlay theme={theme} imgsrc={bgTheme[theme]} minHeight={minHeight}>
      <div className={cx(styles.content, {[styles.disabled]: disabled})}>
        <div className={styles.logo}>
          {theme === 'mr'
            ? <MrLogo />
            : <MrsLogo />
          }
        </div>
        {!disabled &&
          <Checkbox theme={theme} checked={selected} onClick={onSelect} />
        }
        {contentBody && contentBody()}
      </div>
    </ImageOverlay>
  )
}
