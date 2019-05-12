import { put, takeEvery, all } from "redux-saga/effects";
import { PLANNING_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getUpcomingRunsSuccess } from "actions";
import axios from "axios";

export default function* planningSaga() {
  yield all([
    takeEvery(PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST, getUpcomingRuns)
  ]);
}

function* getUpcomingRuns() {
  try {
    console.log("yoooo");

    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getUpcomingRuns?numberOfRuns=${5}&offset=${0}`
    );

    console.log(data);

    yield put(getUpcomingRunsSuccess(data));
  } catch (error) {
    console.log(error);
    //return yield put(signInFailure());
  }
}
