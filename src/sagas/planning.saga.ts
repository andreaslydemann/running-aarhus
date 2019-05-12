import { put, takeEvery, all } from "redux-saga/effects";
import { PLANNING_TYPES, getUpcomingRunsSuccess } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { RunRequest } from "types/common";
import { Action } from "actions/common";
import axios from "axios";

export default function* planningSaga() {
  yield all([
    takeEvery(PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST, getUpcomingRuns)
  ]);
}

function* getUpcomingRuns({ payload }: Action<RunRequest>) {
  try {
    if (!payload) return; //yield put(getUpcomingRunsFailure());

    const { numberOfRuns, offset } = payload;

    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getUpcomingRuns?numberOfRuns=${numberOfRuns}&offset=${offset}`
    );

    yield put(getUpcomingRunsSuccess(data));
  } catch (error) {
    //return yield put(signInFailure());
  }
}
