import firebase from "firebase";

export function getCurrentUser() {
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    throw Error("Current user not found.");
  }

  return currentUser;
}
