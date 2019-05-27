import { put, takeEvery, all } from "redux-saga/effects";
import { PLANNING_TYPES, getUpcomingRunsSuccess } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { RunRequest } from "types/common";
import { Action } from "actions/common";
import axios from "axios";
import { getCurrentUser, addParticipationStatusToRuns } from "utils";

export default function* planningSaga() {
  yield all([
    takeEvery(PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST, getUpcomingRuns)
  ]);
}

function* getUpcomingRuns({ payload }: Action<RunRequest>) {
  try {
    if (!payload) return; //yield put(getUpcomingRunsFailure());

    const { numberOfRuns, offset, filterMyRuns } = payload;

    let requestUrl = `${RUNNING_AARHUS_FUNCTIONS_URL}/getUpcomingRuns?numberOfRuns=${numberOfRuns}&offset=${offset}`;

    if (filterMyRuns) {
      requestUrl += `&userId=${getCurrentUser().uid}`;
    }

    const { data } = yield axios.get(requestUrl);

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      data,
      getCurrentUser().uid
    );

    //console.log("runsWithParticipationStatus: ", runsWithParticipationStatus);

    yield put(
      getUpcomingRunsSuccess(runsWithParticipationStatus, !!filterMyRuns)
    );
  } catch (error) {
    //return yield put(signInFailure());
  }
}
