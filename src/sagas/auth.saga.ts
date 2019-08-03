import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  AUTH_TYPES,
  getCurrentUserSuccess,
  signInSuccess,
  signInFailure,
  getInitialState,
  deleteUserFailure
} from "actions";
import { AsyncStorage } from "react-native";
import * as Facebook from "expo-facebook";
import {
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  RUNNING_AARHUS_FUNCTIONS_URL
} from "constants";
import firebase from "firebase";
import axios from "axios";
import { getAuthUser, navigation } from "utils";

export default function* authSaga() {
  yield all([
    takeEvery(AUTH_TYPES.SIGN_IN, signIn),
    takeEvery(AUTH_TYPES.SIGN_OUT, signOut),
    takeEvery(AUTH_TYPES.GET_CURRENT_USER_REQUEST, getCurrentUser),
    takeEvery(AUTH_TYPES.DELETE_USER_REQUEST, deleteUser)
  ]);
}

function* signIn() {
  let token = yield call(AsyncStorage.getItem, FACEBOOK_TOKEN);

  if (token) {
    yield put(signInSuccess(token));
  } else {
    yield call(startFacebookSignInFlow);
  }

  yield call(getCurrentUser);
}

function* signOut() {
  yield put(getInitialState());

  yield AsyncStorage.clear();

  yield firebase.auth().signOut();
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

      const idToken = yield getAuthUser().getIdToken();

      yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/saveUser`, userInfo, {
        headers: { token: idToken }
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
    { permissions: ["email", "public_profile"], behavior: "web" }
  );

  if (type === "cancel") {
    return yield put(signInFailure());
  }

  yield call(firebaseSignIn, token);
}

function* getCurrentUser() {
  try {
    const userId = getAuthUser().uid;

    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getUser?userId=${userId}`
    );

    yield put(getCurrentUserSuccess(data));
  } catch (error) {
    return console.log(error);
  }
}

function* deleteUser() {
  try {
    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/deleteUser`, {
      userId: getAuthUser().uid
    });
  } catch (error) {
    yield put(deleteUserFailure());
  }

  yield call(navigation.navigate, "Auth");
  yield put(getInitialState());

  yield AsyncStorage.clear();
}
