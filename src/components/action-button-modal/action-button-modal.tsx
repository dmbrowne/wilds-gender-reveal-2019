import * as React from 'react';
import { useState } from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Fab, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Add, Close } from '@material-ui/icons';

import styles from './action-button-modal.module.css';

interface IABMDialogAction {
  onClick: () => any;
  children: React.ReactNode;
  loading?: boolean;
}
interface IAction {
  render: () => React.ReactNode;
  primary: IABMDialogAction;
  secondary: IABMDialogAction;
}

interface IProps {
  title: string;
  textContent: string;
  actions: Partial<IAction>;
  children: React.ReactNode;
  open: boolean;
  actionButton: (onClick: () => any) => React.ReactNode;
}

function Transition(props: TransitionProps) {
  return <Slide direction="up" {...props} />;
}

function ModalActions({ secondary, primary }: { secondary?: IAction['secondary'], primary?: IAction['primary'] }) {
  const secondaryAction = () => secondary && (
    <Button onClick={secondary.onClick} color="primary">
      {secondary.children}
    </Button>
  );
  const primaryAction = () => primary && (
    <Button onClick={primary.onClick} color="primary">
      {primary.children}
    </Button>
  );
  return (
    <DialogActions>
      {secondaryAction()}
      {primaryAction()}
    </DialogActions>
  )
}

const fabActionButton = (onClick: () => any) => (
  <Fab color="primary" children={<Add />} onClick={onClick} />
);

export default function ActionButtonModal({
  title, textContent, actions, children, open, actionButton = fabActionButton
}: Partial<IProps>) {
  const [modalOpen, setModalOpenState] = useState(open || false);

  return (
    <div>
      <Dialog
        fullScreen
        open={modalOpen}
        TransitionComponent={Transition}
        onClose={() => setModalOpenState(false)}
      >
        <div style={{ paddingTop: 64 }}>
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={() => setModalOpenState(false)}>
                <Close />
              </IconButton>
              <Typography variant="h6" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <DialogContentText children={textContent} />
            {children}
            {!!actions && actions.render && actions.render()}
          </DialogContent>
          {!!actions && (actions.secondary || actions.primary) && 
            <ModalActions secondary={actions.secondary} primary={actions.primary} />
          }
        </div>
      </Dialog>
      <div className={styles.actionButton}>
        {actionButton(() => setModalOpenState(true))}
      </div>
    </div>
  )
}
