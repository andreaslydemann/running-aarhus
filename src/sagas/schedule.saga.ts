import { put, takeEvery, all } from "redux-saga/effects";
import { SCHEDULE_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getScheduledRunsSuccess } from "actions";
import { getCurrentUser } from "utils";
import axios from "axios";

export default function* scheduleSaga() {
  yield all([
    takeEvery(SCHEDULE_TYPES.GET_SCHEDULED_RUNS_REQUEST, getScheduledRuns)
  ]);
}

function* getScheduledRuns() {
  try {
    const currentUser = getCurrentUser();

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
