import React, { useState, useEffect } from "react";
import cx from "classnames";
import { Card, CardContent, TextField, Typography, Divider, Fab } from "@material-ui/core";
import { Lock, Send, QuestionAnswer, Check } from "@material-ui/icons";
import LetterCard, { LetterContext } from "../letter-card/letter-card";
import styles from "./hint-code-card.module.css";
import SeparatedCharacterTextFields from "../separated-character-textfields";

interface IProps {
  code: string;
  completed?: boolean;
  letters?: [LetterContext, LetterContext];
  answer: string;
  className?: string;
  question: string;
  onSubmit: (guessValue: string) => any;
}

const Letters = ({ letters }: { letters: IProps["letters"] }) => (
  <div className={styles.letters}>
    {letters &&
      letters.map((letter, idx) => (
        <LetterCard key={idx} backgroundColor={letter.backgroundColor}>
          {letter.letter}
        </LetterCard>
      ))}
  </div>
);

export default function HintCodeCard({ code, completed, letters, answer, question, className = "", onSubmit }: IProps) {
  const wordedAnswers = answer.split(" ");
  const [guess, updateGuess] = useState(completed ? wordedAnswers : new Array(wordedAnswers.length).fill(""));

  const onGuessUpdate = (idx: number) => (str: string) => {
    const newGuess = [...guess];
    newGuess[idx] = str;
    updateGuess(newGuess);
  };

  return (
    <Card className={cx(styles.card, { [className]: !!className })}>
      <CardContent className={styles.cardContent} style={{ padding: "8px 16px" }}>
        <TextField variant="outlined" label="code" value={code} margin="dense" disabled style={{ flexGrow: 1 }} />
        {completed ? (
          <Letters letters={letters} />
        ) : (
          <div className={styles.locked}>
            <Lock />
          </div>
        )}
      </CardContent>
      <CardContent className={styles.cardContent} style={{ padding: "8px 16px" }}>
        <QuestionAnswer fontSize="large" />
        <Typography style={{ flex: 1 }} className={styles.riddle}>
          {question}
        </Typography>
      </CardContent>
      <CardContent style={{ padding: "8px 16px 24px" }}>
        <Divider />
        <div style={{ display: "flex", paddingTop: 16 }}>
          {wordedAnswers.map((word, idx) => (
            <div className={styles.answerWords} key={idx}>
              <SeparatedCharacterTextFields
                spacing={8}
                maxLength={word.length}
                defaultValue={guess[idx]}
                onChange={onGuessUpdate(idx)}
                disabled={completed}
              />
            </div>
          ))}
          <div style={{ width: 60, textAlign: "right", flexShrink: 0 }}>
            {completed ? (
              <Check fontSize="large" color="primary" />
            ) : (
              <Fab
                color="secondary"
                size="small"
                onClick={() => onSubmit(guess.join(" "))}
                disabled={guess.join(" ").length < answer.length}
                children={<Send />}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
