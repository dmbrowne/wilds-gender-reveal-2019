import React from 'react'
import { Button } from '@material-ui/core';
import { ReactComponent as GoogleIcon } from './icons/google.svg';
import { ReactComponent as TwitterIcon } from './icons/twitter.svg';
import { ReactComponent as FacebookIcon } from './icons/facebook-square.svg';

import styles from './social-sign-in.module.css';
import firebase from '../../lib/firebase';

export default function SocialSignIn({ title, onSignIn }: { title?: string, onSignIn?: () => any }) {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();

  const signInWithAuthProvider = (provider: any) => () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(() => onSignIn && onSignIn())
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
      </section>
    </>
  )
}
