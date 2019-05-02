import { call, put, takeEvery, takeLeading, all } from "redux-saga/effects";
import { RUN_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getScheduledRunsSuccess, createRunSuccess } from "actions";
import { getCurrentUser, navigation } from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([
    takeEvery(RUN_TYPES.GET_SCHEDULED_RUNS_REQUEST, getScheduledRuns),
    takeLeading(RUN_TYPES.CREATE_RUN_REQUEST, createRun)
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

function* createRun({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const run = {
      ...payload,
      userId: currentUser.uid
    };

    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/createRun`, run);

    yield put(createRunSuccess());
    yield call(navigation.goBack);
  } catch (error) {
    // yield put(createRunFailure());
  }
}
