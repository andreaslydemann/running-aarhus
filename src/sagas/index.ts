import { fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import runsSaga from "./runs.saga";

export default function* sagas() {
  yield fork(authSaga);
  yield fork(runsSaga);
}
