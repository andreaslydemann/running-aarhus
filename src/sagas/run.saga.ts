import { call, put, takeLeading, all } from "redux-saga/effects";
import { RUN_TYPES } from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { createRunSuccess, createRunFailure } from "actions";
import { getCurrentUser, navigation } from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([takeLeading(RUN_TYPES.CREATE_RUN_REQUEST, createRun)]);
  yield all([takeLeading(RUN_TYPES.SAVE_PARTICIPATION, saveParticipation)]);
  yield all([takeLeading(RUN_TYPES.CANCEL_PARTICIPATION, cancelParticipation)]);
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
    yield put(createRunFailure());
  }
}

function* saveParticipation({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const body = {
      userId: currentUser.uid,
      runId: payload
    };

    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/saveParticipation`, body);

    yield put(toggleParticipation(payload));
  } catch (error) {
    yield put(createRunFailure());
  }
}

function* cancelParticipation({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const body = {
      userId: currentUser.uid,
      runId: payload
    };

    yield axios.post(
      `${RUNNING_AARHUS_FUNCTIONS_URL}/cancelParticipation`,
      body
    );

    yield put(toggleParticipation(payload));
  } catch (error) {
    yield put(createRunFailure());
  }
}
