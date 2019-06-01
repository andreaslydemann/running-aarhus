import { put, takeEvery, all } from "redux-saga/effects";
import { PAST_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getPastRunsSuccess } from "actions";
import { addParticipationStatusToRuns, getCurrentUser } from "utils";
import axios from "axios";

export default function* pastSaga() {
  yield all([takeEvery(PAST_TYPES.GET_PAST_RUNS, getPastRuns)]);
}

function* getPastRuns() {
  try {
    const currentUser = getCurrentUser();

    const { data } = yield axios.get(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/getScheduledRuns?userId=${
        currentUser.uid
      }&getPastRunsInstead=${true}`
    );

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      data,
      getCurrentUser().uid
    );

    yield put(getPastRunsSuccess(runsWithParticipationStatus));
  } catch (error) {
    //return yield put(signInFailure());
  }
}
