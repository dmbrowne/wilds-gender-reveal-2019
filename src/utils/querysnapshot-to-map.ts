import firebase from "../firebase";

export default function convertQuerySnapshotToMap(querySnapshot: firebase.firestore.QuerySnapshot) {
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
    reference: doc.ref,
  }))
}