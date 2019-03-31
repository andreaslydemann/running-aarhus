import { call, put, takeEvery, all } from "redux-saga/effects";
import { AUTH_TYPES, signInSuccess, signInFailure } from "actions";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { FACEBOOK_TOKEN, FACEBOOK_APP_ID } from "constants";
import firebase from "firebase";

export default function* authSaga() {
  yield all([takeEvery(AUTH_TYPES.SIGN_IN_REQUEST, signIn)]);
}

function* signIn() {
  let token = yield call(AsyncStorage.getItem, FACEBOOK_TOKEN);

  if (token) {
    yield put(signInSuccess(token));
  } else {
    yield call(startFacebookSignInFlow);
  }
}

function* firebaseSignIn(token: string) {
  const credential = yield firebase.auth.FacebookAuthProvider.credential(token);

  try {
    yield firebase.auth().signInAndRetrieveDataWithCredential(credential);
    yield call(AsyncStorage.setItem, FACEBOOK_TOKEN, token);
    yield put(signInSuccess(token));
  } catch (error) {
    return yield put(signInFailure());
  }
}

function* startFacebookSignInFlow() {
  let { type, token } = yield call(
    Facebook.logInWithReadPermissionsAsync,
    FACEBOOK_APP_ID,
    { permissions: ["email", "public_profile"] }
  );

  if (type === "cancel") {
    return yield put(signInFailure());
  }

  yield call(firebaseSignIn, token);
}
