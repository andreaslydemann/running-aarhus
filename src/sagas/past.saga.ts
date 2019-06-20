import { put, takeEvery, all } from "redux-saga/effects";
import { PAST_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getPastRunsSuccess, getPastRunsFailure } from "actions";
import { addParticipationStatusToRuns, getAuthUser } from "utils";
import axios from "axios";

export default function* pastSaga() {
  yield all([takeEvery(PAST_TYPES.GET_PAST_RUNS, getPastRuns)]);
}

function* getPastRuns() {
  try {
    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getScheduledRuns?userId=${
        getAuthUser().uid
      }&getPastRunsInstead=${true}`
    );

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      data,
      getAuthUser().uid
    );

    yield put(getPastRunsSuccess(runsWithParticipationStatus));
  } catch (error) {
    yield put(getPastRunsFailure());
  }
}
