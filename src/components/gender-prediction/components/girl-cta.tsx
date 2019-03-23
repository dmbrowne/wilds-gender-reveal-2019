import React, { useState } from "react";
import cx from "classnames";
import { GirlButton } from "./buttons";
import { ReactComponent as Bow } from "../assets/bow.svg";
import { purple } from "@material-ui/core/colors";
import styles from "../gender-prediction.module.css";

const GirlCta = ({ onClick, selected }: { onClick?: () => any; selected?: boolean }) => (
  <div>
    <div className={cx(styles.girlCta, { [styles.selected]: selected })} style={{ color: purple[600] }}>
      <Bow />
    </div>
    <GirlButton size="small" variant="outlined" children="It will be a girl" disabled={!onClick} onClick={onClick} />
  </div>
);

export default GirlCta;
