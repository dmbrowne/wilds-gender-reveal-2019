import firebase from '../../lib/firebase';

export const validateDisplayName = (value: string) => {
  return !value ? 'required!' : false
}

export const checkForExistingDisplayName = (value: string) => (
  firebase.firestore()
    .collection(`users`)
    .where('displayName', '==', value)
    .get()
    .then((querySnapshot) => !querySnapshot.empty)
)

export const validatePassword = (value: string) => !value ? 'required!' : false;

export const validateEmail = (value: string) => {
  const w3CEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (!value) {
    return 'required!';
  }
  if (!w3CEmailRegex.test(value)) {
    return 'Email address is not valid';
  }
  return false;
}

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