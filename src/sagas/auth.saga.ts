import { call, put, takeEvery, all } from "redux-saga/effects";
import { AUTH_TYPES, signInSuccess, signInFailure } from "actions";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import {
  FACEBOOK_TOKEN,
  FACEBOOK_APP_ID,
  RUNNING_AARHUS_FUNCTIONS_URL
} from "constants";
import firebase from "firebase";
import axios from "axios";

export default function* authSaga() {
  yield all([takeEvery(AUTH_TYPES.SIGN_IN_REQUEST, signIn)]);
}

function* signIn() {
  let token = yield call(AsyncStorage.getItem, FACEBOOK_TOKEN);

  setAuthHeaders();

  if (token) {
    yield put(signInSuccess(token));
  } else {
    yield call(startFacebookSignInFlow);
  }
}

function setAuthHeaders() {
  axios.interceptors.request.use(
    async config => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        config.headers.token = await currentUser.getIdToken();
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

function* firebaseSignIn(token: string) {
  const credential = yield firebase.auth.FacebookAuthProvider.credential(token);
  let userData;
  try {
    userData = yield firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential);

    const {
      additionalUserInfo: { isNewUser, profile }
    } = userData;

    const picture = profile.picture ? profile.picture.data.url : "";

    if (!isNewUser) {
      const userInfo = {
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        pictureUrl: picture
      };

      yield axios.post(
        `${RUNNING_AARHUS_FUNCTIONS_URL}/saveUserInfo`,
        userInfo
      );
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
