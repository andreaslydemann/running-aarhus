import firebase from "firebase";

export function getAuthUser() {
  const user = firebase.auth().currentUser;

  if (!user) {
    throw Error("Current user not found.");
  }

  return user;
}
