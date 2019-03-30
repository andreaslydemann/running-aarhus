import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  AUTH_TYPES,
  facebookLoginSuccess,
  facebookLoginFailure
} from "actions";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

export default function* authSaga() {
  yield all([takeEvery(AUTH_TYPES.FACEBOOK_LOGIN_REQUEST, facebookLogin)]);
}

function* facebookLogin() {
  let token = yield call(AsyncStorage.getItem, "fb_token");

  if (token) {
    yield put(facebookLoginSuccess(token));
  } else {
    startFacebookLoginFlow();
  }
}

function* startFacebookLoginFlow() {
  let { type, token } = yield call(
    Facebook.logInWithReadPermissionsAsync,
    "2292488901028008",
    { permissions: ["public_profile"] }
  );

  if (type === "cancel") {
    return yield put(facebookLoginFailure());
  }

  yield call(AsyncStorage.setItem, "fb_token", token);
  yield put(facebookLoginSuccess(token));
}
