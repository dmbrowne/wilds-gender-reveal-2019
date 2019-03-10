import * as React from "react";
import { Snackbar } from "@material-ui/core";
import CustomSnackbarContent, { IExternalProps as ISnackbarProps } from "./snackbar-content";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";

interface IProps extends ISnackbarProps {
  open: boolean;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
}

const CustomSnackbar: React.FC<IProps> = ({ autoHideDuration, anchorOrigin, open, onClose, variant, message }) => (
  <Snackbar
    anchorOrigin={anchorOrigin}
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  >
    <CustomSnackbarContent
      onClose={onClose}
      variant={variant}
      message={message}
    />
  </Snackbar>
);

CustomSnackbar.defaultProps = {
  autoHideDuration: 6000,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  }
};

export default CustomSnackbar;