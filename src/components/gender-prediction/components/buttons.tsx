import React from "react";
import { Typography, withStyles, Chip, Avatar, Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { purple, green } from "@material-ui/core/colors";

export const BoyButton = withStyles({ root: { borderColor: green[100], color: green[100] } })(
  ({ classes, ...props }: ButtonProps) => {
    return <Button classes={classes} {...props} />;
  }
);

export const GirlButton = withStyles({
  root: { borderColor: purple[100], color: purple[100] }
})(({ classes, ...props }: ButtonProps) => {
  return <Button classes={classes} {...props} />;
});
