import { put, takeEvery, all } from "redux-saga/effects";
import { RUNS_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getScheduledRunsSuccess } from "actions";
import firebase from "firebase";
import axios from "axios";

export default function* runsSaga() {
  yield all([
    takeEvery(RUNS_TYPES.GET_SCHEDULED_RUNS_REQUEST, getScheduledRuns)
  ]);
}

function* getScheduledRuns() {
  try {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      throw Error("Current user not found.");
    }

    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getScheduledRuns?userId=${
        currentUser.uid
      }`
    );

    yield put(getScheduledRunsSuccess(data));
  } catch (error) {
    //return yield put(signInFailure());
  }
}
