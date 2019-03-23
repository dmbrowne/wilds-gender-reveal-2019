import React, { useState } from "react";
import { BoyButton, GirlButton } from "./buttons";
import { purple, green } from "@material-ui/core/colors";
import { ReactComponent as Bow } from "../assets/bow.svg";
import { ReactComponent as BowTie } from "../assets/bowtie.svg";
import styles from "../gender-prediction.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles,
  Button
} from "@material-ui/core";
import BoyCta from "./boy-cta";
import GirlCta from "./girl-cta";

const genderStyles = (gender: "boy" | "girl") => ({
  paper: {
    backgroundColor: gender === "boy" ? green[200] : purple[200]
  }
});

const GenderCustomBoyDialog = withStyles(genderStyles("boy"))(Dialog);
const GenderCustomGirlDialog = withStyles(genderStyles("girl"))(Dialog);

const VoteCTA = ({ onSelect }: { onSelect: (gender: "boy" | "girl") => any }) => {
  const [selected, setSelected] = useState<"boy" | "girl" | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const showGenderConfirm = (selectedGender: "boy" | "girl") => {
    setSelected(selectedGender);
    setIsModalActive(true);
  };
  const confirmChoice = () => {
    if (selected) {
      onSelect(selected);
    }
    setIsModalActive(false);
  };
  const GenderDialog = selected === "boy" ? GenderCustomBoyDialog : GenderCustomGirlDialog;
  return (
    <div className={styles.ctas}>
      <BoyCta onClick={() => showGenderConfirm("boy")} />
      <GirlCta onClick={() => showGenderConfirm("girl")} />
      <GenderDialog open={isModalActive} onClose={() => setIsModalActive(false)}>
        <DialogTitle>You've selected "{selected}", are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you're correct you'll add an extra point to your team at the end. But be sure of your choice, once you've
            selected, your vote is irreversible - you won't be able to change it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalActive(false)} style={{ color: "#fff" }}>
            Cancel
          </Button>
          <Button onClick={confirmChoice} style={{ color: "#000" }}>
            Yes, I'm sure
          </Button>
        </DialogActions>
      </GenderDialog>
    </div>
  );
};

export default VoteCTA;
