import React from 'react'
import { getFirestore } from './firebase';
import { Button } from '@material-ui/core';


const AddScavengerHuntQuestions = () => {
  const qs = [
    {
      order: 1,
      question: "Joe’s father had three son’s Snap, Crackle and?",
      answer: "Joe",
      game: getFirestore('games').doc('J8BBrRmI5bXztCVng3dm'),
      meta: {
        letters: {
          gjrgirjidlg: {
            letter: "I",
            backgroundColor: "#f782c8",
          },
          EZT4D7IOLH: {
            letter: "E",
            backgroundColor: "#07283a",
          }
        }
      }
    },
    {
      order: 2,
      question: "I am a mother’s child and a father’s child but nobody’s son. What am I?",
      answer: "A daughter",
      game: getFirestore('games').doc('J8BBrRmI5bXztCVng3dm'),
      meta: {
        letters: {
          ejfhwwwd: {
            letter: "A",
            backgroundColor: "#566935",
          },
          uitryds: {
            letter: "F",
            backgroundColor: "#07283a",
          }
        }
      }
    },
    {
      order: 3,
      question: "What has a tongue but cannot talk and gets around a lot but cannot walk??",
      answer: "A shoe",
      game: getFirestore('games').doc('J8BBrRmI5bXztCVng3dm'),
      meta: {
        letters: {
          yjgfdscv: {
            letter: "P",
            backgroundColor: "#f782c8",
          },
          pvfdigcxv: {
            letter: "I",
            backgroundColor: "#316549",
          }
        }
      }
    },
    {
      order: 4,
      question: "What has hands but can’t pick up anything?",
      answer: "A clock",
      game: getFirestore('games').doc('J8BBrRmI5bXztCVng3dm'),
      meta: {
        letters: {
          cjkwrnvefd: {
            letter: "C",
            backgroundColor: "#4d0117",
          },
          mjchsdigre: {
            letter: "R",
            backgroundColor: "#0a5055",
          }
        }
      }
    }
  ];
  
  const addQuestions = () => {
    qs.map(q => getFirestore('questions').add(q))
  }
  return (
    <div>
      <Button onClick={() => addQuestions()}>Add Questions</Button>
    </div>
  )
}

export default AddScavengerHuntQuestions
