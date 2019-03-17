import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles, Theme, StyledComponentProps } from '@material-ui/core/styles';

interface IThemeClasses {
  success: string;
  error: string;
  info: string;
  warning: string;
  icon: string;
  iconVariant: string;
  message: string;
  [key: string]: string;
}

export interface IExternalProps {
  className?: string,
  message: React.ReactNode;
  onClose?: () => any;
  variant: 'success' | 'warning' | 'error' | 'info';
  noShadow?: boolean;
};

interface IProps extends IExternalProps {
  classes: IThemeClasses,
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme: Theme) => ({
  success: { backgroundColor: green[600], },
  error: { backgroundColor: theme.palette.error.dark, },
  info: { backgroundColor: theme.palette.primary.dark, },
  warning: { backgroundColor: amber[700], },
  icon: { fontSize: 20, },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ThemedSnackbarContent(props: IProps) {
  const { classes, className, message, noShadow, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      style={noShadow ? { boxShadow: 'none', border: '1px solid' } : {}}
      className={classNames(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={!!onClose && [
        <IconButton key="close" color="inherit" className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const CustomSnackbarContent = withStyles(styles)(ThemedSnackbarContent);
export default CustomSnackbarContent;
