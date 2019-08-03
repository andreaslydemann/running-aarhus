import { call, put, takeLeading, all } from "redux-saga/effects";
import { resetRun, RUN_TYPES, setDetails, startDateTimeFailure } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { saveRunSuccess, saveRunFailure } from "actions";
import { addParticipationStatusToRuns, getAuthUser, navigation } from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([takeLeading(RUN_TYPES.SAVE_RUN, saveRun)]);
}

function* saveRun({ payload: { runType, run } }: any) {
  try {
    if (run.startDateTime <= new Date()) {
      return yield put(startDateTimeFailure());
    }

    let body = {
      ...run,
      userId: getAuthUser().uid
    };

    const isNewRun = !run.id;

    let requestUrl = RUNNING_AARHUS_FUNCTIONS_URL;
    if (isNewRun) {
      requestUrl += "/createRun";
    } else {
      requestUrl += "/editRun";
      body.runId = run.id;
    }

    const { data } = yield axios.post(requestUrl, body);

    const runWithParticipationStatus = addParticipationStatusToRuns(
      [data],
      getAuthUser().uid
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
