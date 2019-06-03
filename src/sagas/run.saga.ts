import { call, put, takeLeading, all } from "redux-saga/effects";
import { RUN_TYPES, setDetails } from "actions";
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

    let requestUrl = RUNNING_AARHUS_FUNCTIONS_URL;
    let body = {
      ...payload,
      userId: currentUser.uid
    };

    if (payload.id) {
      requestUrl += "/editRun";
      body = { ...body, runId: payload.id };
    } else {
      requestUrl += "/createRun";
    }

    const { data } = yield axios.post(requestUrl, body);

    const runWithParticipationStatus = addParticipationStatusToRuns(
      [data],
      getCurrentUser().uid
    )[0];

    yield put(setDetails(runWithParticipationStatus));
    yield put(saveRunSuccess(runWithParticipationStatus));

    yield call(navigation.goBack);
  } catch (error) {
    yield put(saveRunFailure());
  }
}
