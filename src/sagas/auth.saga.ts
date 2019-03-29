import { takeEvery, all } from "redux-saga/effects";
import { COUNTER_TYPES } from "actions";

export default function* authSaga() {
  yield all([takeEvery(COUNTER_TYPES.INCREMENT, logIncrementAction)]);
}

export function* logIncrementAction(): any {
  console.log("hello");
}
