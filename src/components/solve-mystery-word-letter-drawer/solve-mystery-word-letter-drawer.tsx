import React from 'react'
import LetterCard, { LetterContext } from '../letter-card/letter-card';
import LetterCardSilhouette from '../letter-card/letter-card-silhouette';

interface IFetchedLetterContext extends LetterContext {
  id: string;
}

interface IProps {
  letters: IFetchedLetterContext[];
  chosenLetters: Array<IFetchedLetterContext | null>;
  onLetterClick: (letterContext: IFetchedLetterContext) => any;
}

export default function SolveMysteryWordLetterDrawer({ letters, chosenLetters, onLetterClick }: IProps) {
  return (
    <>
      {letters.map(letterContext => {
        const { id, letter, backgroundColor } = letterContext;
        const alreadyChosen = chosenLetters.find(lttr => !!lttr && lttr.id === id);
        if (alreadyChosen) {
          return <LetterCardSilhouette key={id} />
        }
        return (
          <div key={id} onClick={() => onLetterClick(letterContext)}>
            <LetterCard
              size="large"
              children={letter}
              backgroundColor={backgroundColor}
            />
          </div>
        )
      })}
    </>
  )
}
