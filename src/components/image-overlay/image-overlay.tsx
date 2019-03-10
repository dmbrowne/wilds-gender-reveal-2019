import React, { Children, ReactNode } from 'react'
import cx from 'classnames';

import styles  from './image-overlay.module.css';

interface IProps {
  imgsrc: string;
  theme: 'mr' | 'mrs';
  children?: ReactNode;
  minHeight: string | number;
}

export default function ImageOverlay({ imgsrc, theme, children, minHeight = '100vh' }: IProps) {
  return (
    <div className={styles.container} style={{minHeight}}>
      <img src={imgsrc} className={styles.image} />
      <div className={cx(styles.overlayBackdrop, {
        [styles.mrTheme]: theme === 'mr',
        [styles.mrsTheme]: theme === 'mrs',
      })} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
