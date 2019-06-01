import { call, put, takeLeading, all } from "redux-saga/effects";
import { RUN_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { createRunSuccess, createRunFailure } from "actions";
import {
  addParticipationStatusToRuns,
  getCurrentUser,
  navigation
} from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([takeLeading(RUN_TYPES.CREATE_RUN, createRun)]);
}

function* createRun({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const run = {
      ...payload,
      userId: currentUser.uid
    };

    const { data } = yield axios.post(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/createRun`,
      run
    );

    const runsWithParticipationStatus = addParticipationStatusToRuns(
      [data],
      getCurrentUser().uid
    );

    yield put(createRunSuccess(runsWithParticipationStatus));
    yield call(navigation.goBack);
  } catch (error) {
    yield put(createRunFailure());
  }
}
