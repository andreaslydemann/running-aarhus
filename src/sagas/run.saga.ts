import { call, put, takeLeading, all } from "redux-saga/effects";
import { resetRun, RUN_TYPES, setDetails } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { saveRunSuccess, saveRunFailure } from "actions";
import {
  addParticipationStatusToRuns,
  getCurrentUser,
  navigation
} from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([takeLeading(RUN_TYPES.SAVE_RUN, saveRun)]);
}

function* saveRun({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const { runType, run } = payload;

    let requestUrl = RUNNING_AARHUS_FUNCTIONS_URL;
    let body = {
      ...run,
      userId: currentUser.uid
    };

    const isNewRun = !run.id;

    if (isNewRun) {
      requestUrl += "/createRun";
    } else {
      requestUrl += "/editRun";
      body.runId = run.id;
    }

    const { data } = yield axios.post(requestUrl, body);

    const runWithParticipationStatus = addParticipationStatusToRuns(
      [data],
      getCurrentUser().uid
    )[0];

    if (runType) {
      yield put(setDetails(runWithParticipationStatus, runType));
    }

    yield put(saveRunSuccess(runWithParticipationStatus, isNewRun));
    yield put(resetRun());

    yield call(navigation.goBack);
  } catch (error) {
    yield put(saveRunFailure());
  }
}
