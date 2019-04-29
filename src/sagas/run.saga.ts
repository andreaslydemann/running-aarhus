import { put, takeEvery, all } from "redux-saga/effects";
import { RUN_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getScheduledRunsSuccess } from "actions";
import { getCurrentUser } from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([
    takeEvery(RUN_TYPES.GET_SCHEDULED_RUNS_REQUEST, getScheduledRuns),
    takeEvery(RUN_TYPES.CREATE_RUN_REQUEST, createRun)
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

function* createRun(run: any) {
  try {
    const currentUser = getCurrentUser();

    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/createRun`, run);
  } catch (error) {
    // yield put(createRunFailure());
  }
}
