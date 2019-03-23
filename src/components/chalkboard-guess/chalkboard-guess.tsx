import React from "react";
import styles from "./chalkboard-guess.module.css";
import LetterCard from "../letter-card";
import { LetterContext } from "../letter-card/letter-card";
import LetterPlaceholder from "./letter-placeholder";
import Chalkboard from "../chalkboard/chalkboard";

interface IProps {
  selectedIdx: number;
  onItemClick: (idx: number) => any;
  onDelete: (idx: number) => any;
  maxLength: number;
  letters: Array<LetterContext | null>;
  getItemKey: (item: any) => string;
  disabled: boolean;
}

export default function ChalkboardGuess({
  selectedIdx,
  onItemClick,
  letters,
  maxLength,
  onDelete,
  getItemKey,
  disabled
}: IProps) {
  return (
    <Chalkboard className={styles.root}>
      <div className={styles.content}>
        {new Array(maxLength).fill("").map((_, idx) => {
          const letter = letters[idx];
          return (
            <LetterPlaceholder
              key={letter ? getItemKey(letter) : idx}
              onDelete={() => !disabled && onDelete(idx)}
              onClick={() => !disabled && onItemClick(idx)}
              active={disabled ? false : selectedIdx === idx}
              hideUndo={disabled}
              render={() =>
                !!letter ? <LetterCard children={letter.letter} backgroundColor={letter.backgroundColor} /> : null
              }
            />
          );
        })}
      </div>
    </Chalkboard>
  );
}
