import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  AUTH_TYPES,
  facebookSignInSuccess,
  facebookSignInFailure
} from "actions";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";

export default function* authSaga() {
  yield all([takeEvery(AUTH_TYPES.FACEBOOK_SIGN_IN_REQUEST, facebookSignIn)]);
}

function* facebookSignIn() {
  let token = yield call(AsyncStorage.getItem, "fb_token");

  if (token) {
    yield put(facebookSignInSuccess(token));
  } else {
    yield call(startfacebookSignInFlow);
  }
}

function* startfacebookSignInFlow() {
  let { type, token } = yield call(
    Facebook.logInWithReadPermissionsAsync,
    "2292488901028008",
    { permissions: ["public_profile"] }
  );

  if (type === "cancel") {
    return yield put(facebookSignInFailure());
  }

  yield call(AsyncStorage.setItem, "fb_token", token);
  yield put(facebookSignInSuccess(token));
}
