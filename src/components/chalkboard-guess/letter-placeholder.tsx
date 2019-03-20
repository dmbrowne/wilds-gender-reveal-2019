import { withTheme, Theme, IconButton, Button } from '@material-ui/core';
import * as React from 'react';
import { HtmlHTMLAttributes } from 'react';
import styles from './letter-placeholder.module.css';
import { Close } from '@material-ui/icons';

interface IProps extends HtmlHTMLAttributes<HTMLDivElement> {
  theme: Theme;
  render: () => React.ReactNode;
  onDelete: () => any;
  active: boolean;
  hideUndo: boolean;
}

const LetterPlaceholder = withTheme()(
  ({ theme, render, active, onDelete, hideUndo, ...props }: IProps) => {
    const child = render();
    return (
      <div className={styles.letterPlaceholder} {...props}>
        {child}
        {!child && <span className={styles.underline}>_</span>}
        {!!child && !hideUndo && (
          <Button
            style={{
              minWidth: 40,
              marginpadding: '2px 4px',
              color: theme.palette.error.main,
            }}
            classes={{ root: styles.deleteButton }}
            size="small"
            onClick={onDelete}
          >
            <span className={styles.undoText}>undo</span>
          </Button>
        )}
        {active && (
          <span
            className={styles.activeOverlay}
            style={{
              backgroundColor: theme.palette.primary.light,
              borderColor: theme.palette.primary.dark,
            }}
          />
        )}
      </div>
    );
  },
);

export default LetterPlaceholder;
