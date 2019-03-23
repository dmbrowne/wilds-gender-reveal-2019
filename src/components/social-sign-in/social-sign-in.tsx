import React, { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { ReactComponent as GoogleIcon } from "./icons/google.svg";
import { ReactComponent as TwitterIcon } from "./icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "./icons/facebook-square.svg";

import styles from "./social-sign-in.module.css";
import firebase from "../../firebase";
import CustomSnackbar from "../snackbar/snackbar";
import { addUserDisplayNametoUserCollection } from "../auth-entry/utils";

type SocialProvider =
  | firebase.auth.FacebookAuthProvider
  | firebase.auth.TwitterAuthProvider
  | firebase.auth.GoogleAuthProvider;

export default function SocialSignIn({ title, onSignIn }: { title?: string; onSignIn?: () => any }) {
  const [isSignInPending, setIsSignInPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();

  const signInWithAuthProvider = (provider: SocialProvider) => () => {
    setIsSignInPending(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        setIsSignInPending(false);
        if (user) {
          addUserDisplayNametoUserCollection(user.uid, user.displayName || "").then(() => {
            onSignIn && onSignIn();
          });
        }
      })
      .catch(e => {
        setIsSignInPending(false);
        setErrorMessage(e.message);
        console.error(e);
      });
  };

  if (isSignInPending) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <header className={styles.title}>{title}</header>
      <section className={styles.socialSignIn}>
        <Button
          onClick={signInWithAuthProvider(facebookProvider)}
          variant="contained"
          size="large"
          className={styles.facebook}
        >
          <FacebookIcon />
        </Button>
        <Button
          onClick={signInWithAuthProvider(googleProvider)}
          variant="contained"
          size="large"
          className={styles.google}
        >
          <GoogleIcon />
        </Button>
        <Button
          onClick={signInWithAuthProvider(twitterProvider)}
          variant="contained"
          size="large"
          className={styles.twitter}
        >
          <TwitterIcon />
        </Button>
        <CustomSnackbar
          autoHideDuration={null}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!errorMessage}
          variant="error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      </section>
    </>
  );
}
