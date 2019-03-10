import React, { useState } from 'react'
import cx from 'classnames';
import { withTeamTheme } from '../../contexts/theme';
import LetterCard, { LetterContext } from '../../components/letter-card/letter-card';
import ChalkboardGuess from '../../components/chalkboard-guess';
import { withTheme, Theme, Button, Typography, Divider, Card } from '@material-ui/core';
import styles from './solve-mystery-word.module.css';
import LetterCardSilhouette from '../../components/letter-card/letter-card-silhouette';
import { Info } from '@material-ui/icons';
import { blue, grey, green, purple } from '@material-ui/core/colors';
import { IWithTeamThemeProps } from '../../contexts/theme/withTeamTheme';
import SolveMysteryWordHeader from '../../components/solve-mystery-word-header';
import SolveMysteryWordLetterDrawer from '../../components/solve-mystery-word-letter-drawer';
import SolveMysteryWordHints from '../../components/solve-mystery-word-hints';

interface Hint {
  hint: string;
  unlocked: boolean;
}

interface IFetchedLetterContext extends LetterContext{
  id: string;
}

interface IProps extends IWithTeamThemeProps {
  theme: Theme;
  letters: IFetchedLetterContext[];
  answer: string;
  solved: boolean;
  hints: Hint[];
}

type ChosenLetters = IFetchedLetterContext | null

function SolveMysteryWordScreen({ theme, teamThemeProps, letters, answer, hints }: IProps) {
  const genderThemeColor = teamThemeProps.currentTeam === 'mr' ? green : purple;
  const [activeIndex, updateSelectedIdx] = useState(0);
  const [chosenLetters, changeChosenLetters] = useState([] as ChosenLetters[])
  const hintsUsed = hints.filter(hint => hint.unlocked);
  const valid = chosenLetters.length === answer.length && chosenLetters.every(letter => !!letter);

  const deleteGuessLetter = (idx: number) => {
    const updatedLetters = [...chosenLetters];
    updatedLetters[idx] = null;
    changeChosenLetters(updatedLetters);
  };

  const updateChosenLetters = (idx: number, letterContext: IFetchedLetterContext) => {
    const updatedLetters = [...chosenLetters];
    updatedLetters[idx] = {...letterContext};
    changeChosenLetters(updatedLetters);
    updateSelectedIdx(activeIndex + 1)
  };

  return (
    <div className={styles.root} style={{ backgroundColor: genderThemeColor[50] }}>
      <SolveMysteryWordHeader />
      <main className={styles.main}>
        <Typography variant="display1" gutterBottom align="center" style={{ color: '#fff' }}>Solve the mystery word</Typography>
        <Typography
          className={cx(styles.container, styles.centeredText)}
          variant="subheading"
          children="Use the letters that your team has unlocked below, to work out what the mystery word is"
        />
        <div className={cx(styles.container, styles.chalkboard)}>
          <ChalkboardGuess
            selectedIdx={activeIndex}
            onItemClick={updateSelectedIdx}
            letters={chosenLetters}
            getItemKey={(item: IFetchedLetterContext) => item.id}
            maxLength={answer.length}
            onDelete={deleteGuessLetter}
          />
        </div>
        <div className={styles.submitButtonContainer}>
          <Button size="large" color="primary" variant="contained" fullWidth disabled={!valid}>
            Submit
          </Button>
        </div>
        <Divider variant="middle" />
        <div className={cx(styles.container, styles.lettersDrawer)}>
          <SolveMysteryWordLetterDrawer
            letters={letters}
            chosenLetters={chosenLetters}
            onLetterClick={letterContext => updateChosenLetters(activeIndex, letterContext)}
          />
        </div>
        <Divider variant="middle" />
        <div className={cx(styles.centeredText, styles.container)}>
          <SolveMysteryWordHints hintsUsed={hintsUsed} totalHints={hints.length} />
        </div>
      </main>
    </div>
  )
}


export default withTheme()(withTeamTheme(SolveMysteryWordScreen));