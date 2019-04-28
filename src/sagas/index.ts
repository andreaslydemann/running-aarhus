import { fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import runSaga from "./run.saga";

export default function* sagas() {
  yield fork(authSaga);
  yield fork(runSaga);
}
