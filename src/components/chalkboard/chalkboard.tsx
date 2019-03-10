import * as React from 'react';
import cx from 'classnames';
import styles from './chalkboard.module.css';

interface IProps {
  tiled?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any

}
export default function Chalkboard<P>({ className, tiled, children, ...props }: IProps) {
  return (
    <div className={cx(styles.root, {
      [styles.tiled]: tiled,
    }, className)}>
      {children}
    </div>
  )
}