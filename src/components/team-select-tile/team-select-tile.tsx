import React, { ReactNode, ReactElement } from "react";
import cx from "classnames";
import ImageOverlay from "../image-overlay";
import Text from "../text";

import styles from "./team-select-tile.module.css";
import Checkbox from "../checkbox";
import { MrLogo, MrsLogo } from "../team-logo";
import woz from "./woz.jpeg";
import donnatina from "./donna.jpeg";

interface IProps {
  theme: "mr" | "mrs";
  onSelect: () => any;
  selected: boolean;
  hideCheckbox?: boolean;
  hideLabel?: boolean;
  contentBody?: () => ReactNode;
  // minHeight: string | number;
}

const bgTheme = {
  mr: woz,
  mrs: donnatina
};

const teamNames = {
  mr: "MR.",
  mrs: "MRS."
};

export default function TeamSelectTile({
  theme,
  onSelect,
  selected,
  hideCheckbox,
  hideLabel,
  contentBody
}: // minHeight
IProps) {
  return (
    <ImageOverlay theme={theme} imgsrc={bgTheme[theme]}>
      <div className={styles.content}>
        {!hideLabel && (
          <div className={styles.logo}>{theme === "mr" ? <MrLogo /> : <MrsLogo />}</div>
        )}
        {!hideCheckbox && <Checkbox theme={theme} checked={selected} onClick={onSelect} />}
        {contentBody && contentBody()}
      </div>
    </ImageOverlay>
  );
}
