import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
// import { firebaseUI } from './index'
// const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

export default function signInWithUI(element: HTMLElement, redirectUrl: string) {
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start(element, {
    signInSuccessUrl: redirectUrl,
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      }
    ]
  });
}