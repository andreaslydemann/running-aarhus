import { takeEvery, all } from "redux-saga/effects";
import { RUNS_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import firebase from "firebase";
import axios from "axios";

export default function* runsSaga() {
  yield all([
    takeEvery(RUNS_TYPES.GET_SCHEDULED_RUNS_REQUEST, getScheduledRuns)
  ]);
}

function* getScheduledRuns() {
  try {
    let { currentUser } = firebase.auth();

    if (!currentUser) {
      throw Error("Current user not found.");
    }

    yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getScheduledRuns?userId=${
        currentUser.uid
      }`
    );
  } catch (error) {
    //return yield put(signInFailure());
  }

  //yield put(signInSuccess(token));
}
