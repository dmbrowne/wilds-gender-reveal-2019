import React, { useState } from "react";
import cx from "classnames";
import { BoyButton } from "./buttons";
import { ReactComponent as BowTie } from "../assets/bowtie.svg";
import { green } from "@material-ui/core/colors";
import styles from "../gender-prediction.module.css";
import { Typography } from "@material-ui/core";

const BoyCta = ({ onClick, selected }: { onClick?: () => any; selected?: boolean }) => (
  <div>
    <div className={cx(styles.boyCta, { [styles.selected]: selected })} style={{ color: green[600] }}>
      <BowTie />
    </div>
    {selected ? (
      <Typography align="center" style={{ color: green[100] }}>
        You Chose boy
      </Typography>
    ) : (
      <BoyButton size="small" variant="outlined" children="It will be a boy" disabled={!onClick} onClick={onClick} />
    )}
  </div>
);

export default BoyCta;
