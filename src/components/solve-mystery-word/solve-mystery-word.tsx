import React, { useState, useEffect } from "react";
import cx from "classnames";
import { withTeamTheme } from "../../providers/theme";
import { LetterContext } from "../../components/letter-card/letter-card";
import ChalkboardGuess from "../../components/chalkboard-guess";
import { withTheme, Button, Typography, Divider, IconButton } from "@material-ui/core";
import styles from "./solve-mystery-word.module.css";
import { green, purple } from "@material-ui/core/colors";
import { IWithTeamThemeProps } from "../../providers/theme/withTeamTheme";
import SolveMysteryWordHeader from "../../components/solve-mystery-word-header";
import SolveMysteryWordLetterDrawer from "../../components/solve-mystery-word-letter-drawer";
import SolveMysteryWordHints from "../../components/solve-mystery-word-hints";
import CustomSnackbar from "../snackbar/snackbar";
import { ArrowBack } from "@material-ui/icons";

interface Hint {
  hint: string;
  unlocked: boolean;
}

interface IFetchedLetterContext extends LetterContext {
  id: string;
}

interface IProps extends IWithTeamThemeProps {
  letters: IFetchedLetterContext[];
  answer: string;
  solved: boolean;
  hints: Hint[];
  onSolveSuccess: () => any;
  onGoBack: () => any;
}

type ChosenLetters = IFetchedLetterContext | null;

function SolveMysteryWordScreen({ teamThemeProps, letters, answer, solved, hints, onGoBack, onSolveSuccess }: IProps) {
  const genderThemeColor = teamThemeProps.currentTeam === "mr" ? green : purple;
  const [activeIndex, updateSelectedIdx] = useState(0);
  const [chosenLetters, changeChosenLetters] = useState<any>([]);
  const [showErrorFeedback, setShowErrorFeedback] = useState(false);

  const hintsUsed = hints.filter(hint => hint.unlocked);
  const valid = chosenLetters.length === answer.length && chosenLetters.every((letter: any) => !!letter);

  useEffect(() => {
    if (solved) {
      const clonedLetters = [...letters];
      changeChosenLetters(
        answer.split("").map(answerLetter => {
          const idx = clonedLetters.findIndex(({ letter }) => letter === answerLetter);
          return clonedLetters.splice(idx, 1)[0];
        })
      );
    }
  }, [solved]);

  const deleteGuessLetter = (idx: number) => {
    const updatedLetters = [...chosenLetters];
    updatedLetters[idx] = null;
    changeChosenLetters(updatedLetters);
  };

  const updateChosenLetters = (idx: number, letterContext: IFetchedLetterContext) => {
    const updatedLetters = [...chosenLetters];
    updatedLetters[idx] = { ...letterContext };
    changeChosenLetters(updatedLetters);
    updateSelectedIdx(activeIndex + 1);
  };

  const attemptSolve = () => {
    if (chosenLetters.length > 0) {
      const word = chosenLetters
        .map((chosenLetter: any) => chosenLetter && chosenLetter.letter)
        .filter((letter: string) => !!letter)
        .join("");

      if (word === answer) {
        onSolveSuccess();
      } else {
        setShowErrorFeedback(true);
      }
    }
  };

  return (
    <div className={styles.root} style={{ backgroundColor: genderThemeColor[50] }}>
      <div className={styles.headerImage}>
        <SolveMysteryWordHeader />
      </div>
      <main className={styles.main}>
        <IconButton onClick={onGoBack}>
          <ArrowBack style={{ color: "#fff" }} fontSize="large" />
        </IconButton>
        <Typography variant="display1" gutterBottom align="center" style={{ color: "#fff" }}>
          Solve the mystery word
        </Typography>
        <Typography
          className={cx(styles.container, styles.centeredText)}
          variant="subheading"
          children="Use the letters that your team has unlocked below, to work out what the mystery word is"
        />
        <div className={styles.container}>
          <ChalkboardGuess
            disabled={solved}
            selectedIdx={activeIndex}
            onItemClick={updateSelectedIdx}
            letters={chosenLetters}
            getItemKey={(item: IFetchedLetterContext) => item.id}
            maxLength={answer.length}
            onDelete={deleteGuessLetter}
          />
        </div>
        {!solved && (
          <div className={styles.submitButtonContainer}>
            <Button
              size="large"
              color="primary"
              onClick={attemptSolve}
              variant="contained"
              fullWidth
              disabled={!valid || solved}
            >
              Submit
            </Button>
          </div>
        )}
        <Divider variant="middle" />
        <div className={cx(styles.container, styles.lettersDrawer)}>
          <SolveMysteryWordLetterDrawer
            letters={letters}
            chosenLetters={chosenLetters}
            onLetterClick={letterContext => updateChosenLetters(activeIndex, letterContext)}
          />
        </div>
        {hints && hints.length > 0 && (
          <>
            <Divider variant="middle" />
            <div className={cx(styles.centeredText, styles.container)}>
              <SolveMysteryWordHints hintsUsed={hintsUsed} totalHints={hints.length} />
            </div>
          </>
        )}
      </main>
      <CustomSnackbar
        open={showErrorFeedback}
        onClose={() => setShowErrorFeedback(false)}
        variant="error"
        message="incorrect, try again"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      />
    </div>
  );
}

const SolveMysteryWord = withTheme()(withTeamTheme(SolveMysteryWordScreen));

export default SolveMysteryWord;
