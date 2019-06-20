import { put, takeEvery, all } from "redux-saga/effects";
import { SCHEDULE_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getScheduledRunsSuccess, getScheduledRunsFailure } from "actions";
import { addParticipationStatusToRuns, getAuthUser } from "utils";
import axios from "axios";

export default function* scheduleSaga() {
  yield all([takeEvery(SCHEDULE_TYPES.GET_SCHEDULED_RUNS, getScheduledRuns)]);
}

function* getScheduledRuns() {
  try {
    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getScheduledRuns?userId=${
        getAuthUser().uid
      }`
    );

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      data,
      getAuthUser().uid
    );

    yield put(getScheduledRunsSuccess(runsWithParticipationStatus));
  } catch (error) {
    yield put(getScheduledRunsFailure());
  }
}
