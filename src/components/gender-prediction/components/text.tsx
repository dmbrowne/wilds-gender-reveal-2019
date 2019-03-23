import React from "react";
import { Typography, withStyles, Chip, Avatar, Button } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";
import { TypographyProps } from "@material-ui/core/Typography";

export const BoyText = withStyles({ root: { color: green[200] } })(({ classes, ...props }: TypographyProps) => {
  return <Typography classes={classes} {...props} />;
});

export const GirlText = withStyles({ root: { color: purple[100] } })(({ classes, ...props }: TypographyProps) => {
  return <Typography classes={classes} {...props} />;
});
