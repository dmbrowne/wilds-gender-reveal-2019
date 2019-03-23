import React from "react";
import styles from "./page-spinner.module.css";
import { CircularProgress, Typography } from "@material-ui/core";
import { CircularProgressProps } from "@material-ui/core/CircularProgress";

const PageSpinner: React.FC<CircularProgressProps> = ({ children, ...props }) => {
  return (
    <div className={styles.pageSpinner}>
      <div>
        <CircularProgress size={100} {...props} />
        <Typography align="center" variant="caption">
          {children}
        </Typography>
      </div>
    </div>
  );
};

export default PageSpinner;
