import firebase from '../../firebase';

export const checkForExistingDisplayName = (value: string) => (
  firebase.firestore()
    .collection(`users`)
    .where('displayName', '==', value)
    .get()
    .then((querySnapshot) => !querySnapshot.empty)
)

export function addUserDisplayNametoUserCollection(uid: string, displayName: string) {
  firebase.firestore().collection('users').doc(uid).set({
    displayName,
  })
}

export function createUser(email: string, password: string, displayName: string) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({ user }: firebase.auth.UserCredential) => {
      if (user) {
        return user.updateProfile({ displayName })
          .then(() => addUserDisplayNametoUserCollection(user.uid, displayName))
      }
    })
}

export function emailSignIn(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}