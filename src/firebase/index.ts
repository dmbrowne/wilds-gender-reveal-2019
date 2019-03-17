import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import credentials from './credentials.json';

export function initialize() {
  firebase.initializeApp({
    apiKey: credentials.apiKey,
    authDomain: credentials.authDomain,
    databaseURL: credentials.databaseURL,
    projectId: credentials.projectId,
    storageBucket: credentials.storageBucket,
    messagingSenderId: credentials.messagingSenderId,
  });
}
export { default as signInWithUI } from './sign-in';
export const getFirebaseAuth = () => firebase.auth();
export const getFirestore = (collection: string) => firebase.firestore().collection(collection);
export const realtimeDatabase = () => firebase.database();
export default firebase