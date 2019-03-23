import React from "react";
import { getFirestore } from "./firebase";
import { Button } from "@material-ui/core";

const AddScavengerHuntQuestions = () => {
  const qs = [
    {
      question: "What pulls you down and never lets go?",
      answer: "Gravity",
      game: getFirestore("games").doc("stf2551EJzAhP1oD6uyw"),
      order: 1,
      code: "15782",
      meta: {
        letters: {
          svjvavcv: {
            letter: "r",
            backgroundColor: "#c80cce"
          },
          aubsxsosj: {
            letter: "t",
            backgroundColor: "#ce0b79"
          }
        }
      }
    },
    {
      question: "What goes up and down but never moves?",
      answer: "Stairs",
      game: getFirestore("games").doc("stf2551EJzAhP1oD6uyw"),
      order: 2,
      code: "26653",
      meta: {
        letters: {
          ansxand: {
            letter: "o",
            backgroundColor: "#081191"
          },
          sjbxqubiu: {
            letter: "e",
            backgroundColor: "#e8ef10"
          }
        }
      }
    },
    {
      question: "I have many keys but I cannot open a single lock. What am I?",
      answer: "Piano",
      order: 3,
      code: "20899",
      game: getFirestore("games").doc("stf2551EJzAhP1oD6uyw"),
      meta: {
        letters: {
          dfztyku: {
            letter: "r",
            backgroundColor: "#0fb7ef"
          },
          xzertsxtr: {
            letter: "l",
            backgroundColor: "#5458d8"
          }
        }
      }
    },
    {
      question: "What can you fill a room with that takes up no space?",
      answer: "Light",
      order: 4,
      code: "32905",
      game: getFirestore("games").doc("stf2551EJzAhP1oD6uyw"),
      meta: {
        letters: {
          dfztyku: {
            letter: "r",
            backgroundColor: "#8befd3"
          },
          xzertsxtr: {
            letter: "l",
            backgroundColor: "#f4ac27"
          }
        }
      }
    }
  ];

  const addQuestions = () => {
    qs.map(q => getFirestore("questions").add(q));
  };
  return (
    <div>
      <Button onClick={() => addQuestions()}>Add Questions</Button>
    </div>
  );
};

export default AddScavengerHuntQuestions;
