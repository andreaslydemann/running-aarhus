import { call, put, takeEvery, all } from "redux-saga/effects";
import { AUTH_TYPES, signInSuccess, signInFailure } from "actions";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import {
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  RUNNING_AARHUS_FUNCTIONS_URL,
  GET_INITIAL_STATE
} from "constants";
import firebase from "firebase";
import axios from "axios";
import { getCurrentUser, navigation } from "utils";

export default function* authSaga() {
  yield all([takeEvery(AUTH_TYPES.SIGN_IN, signIn)]);
  yield all([takeEvery(AUTH_TYPES.DELETE_USER, deleteUser)]);
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
  let userData;
  try {
    userData = yield firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential);

    const {
      additionalUserInfo: { isNewUser, profile },
      user: { uid }
    } = userData;

    const picture = profile.picture ? profile.picture.data.url : "";

    if (isNewUser) {
      const userInfo = {
        id: uid,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        pictureUrl: picture
      };

      const idToken = yield getCurrentUser().getIdToken();

      yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/saveUser`, userInfo, {
        headers: { Authorization: "Bearer " + idToken }
      });
    }
  } catch (error) {
    return yield put(signInFailure());
  }

  yield call(AsyncStorage.setItem, FACEBOOK_TOKEN, token);
  yield put(signInSuccess(token));
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

function* deleteUser() {
  const currentUser = yield getCurrentUser();

  try {
    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/deleteUser`, {
      userId: currentUser.uid
    });
  } catch (error) {
    return console.log(error);
  }

  yield call(navigation.navigate, "Auth");

  yield put({ type: GET_INITIAL_STATE });

  yield AsyncStorage.clear();
}
