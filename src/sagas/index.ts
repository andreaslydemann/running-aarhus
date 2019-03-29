import { fork } from "redux-saga/effects";
import authSaga from "./auth.saga";

export default function* sagas() {
  yield fork(authSaga);
}
