import { fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import runSaga from "./run.saga";
import scheduleSaga from "./schedule.saga";
import planningSaga from "./planning.saga";
import pastSaga from "./past.saga";
import detailsSaga from "./details.saga";

export default function* sagas() {
  yield fork(authSaga);
  yield fork(runSaga);
  yield fork(scheduleSaga);
  yield fork(planningSaga);
  yield fork(pastSaga);
  yield fork(detailsSaga);
}
