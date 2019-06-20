import { put, takeEvery, all } from "redux-saga/effects";
import {
  PLANNING_TYPES,
  getUpcomingRunsSuccess,
  getUpcomingRunsFailure
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { RunRequest, Action } from "types/common";
import axios from "axios";
import { getAuthUser, addParticipationStatusToRuns } from "utils";

export default function* planningSaga() {
  yield all([takeEvery(PLANNING_TYPES.GET_UPCOMING_RUNS, getUpcomingRuns)]);
}

function* getUpcomingRuns({ payload }: Action<RunRequest>) {
  try {
    if (!payload) return yield put(getUpcomingRunsFailure());

    const { numberOfRuns, offset, filterMyRuns } = payload;

    let requestUrl = `${RUNNING_AARHUS_FUNCTIONS_URL}/getUpcomingRuns?numberOfRuns=${numberOfRuns}&offset=${offset}`;

    if (filterMyRuns) {
      requestUrl += `&userId=${getAuthUser().uid}`;
    }

    const { data } = yield axios.get(requestUrl);

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      data,
      getAuthUser().uid
    );

    yield put(
      getUpcomingRunsSuccess(runsWithParticipationStatus, !!filterMyRuns)
    );
  } catch (error) {
    yield put(getUpcomingRunsFailure());
  }
}
