import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const config = {
  apiKey: "AIzaSyCpCbsoXdNV09rIc3UaRVI8IW9msiIExHI",
  authDomain: "wilds-gender-reveal-19.firebaseapp.com",
  databaseURL: "https://wilds-gender-reveal-19.firebaseio.com",
  projectId: "wilds-gender-reveal-19",
  storageBucket: "wilds-gender-reveal-19.appspot.com",
  messagingSenderId: "472416244899"
};

export function setupFirebase() {
  firebase.initializeApp(config);
}

export default firebase;