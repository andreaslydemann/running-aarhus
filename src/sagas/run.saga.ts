import { call, put, takeLeading, all } from "redux-saga/effects";
import {
  participationFailure,
  participationRequest,
  participationSuccess,
  RUN_TYPES
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { createRunSuccess, createRunFailure } from "actions";
import { getCurrentUser, navigation } from "utils";
import axios from "axios";

export default function* runSaga() {
  yield all([takeLeading(RUN_TYPES.CREATE_RUN_REQUEST, createRun)]);
  yield all([takeLeading(RUN_TYPES.SAVE_PARTICIPATION, changeParticipation)]);
  yield all([takeLeading(RUN_TYPES.CANCEL_PARTICIPATION, changeParticipation)]);
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

function* changeParticipation({ payload }: any) {
  try {
    const currentUser = getCurrentUser();

    const body = {
      userId: currentUser.uid,
      runId: payload.id
    };

    yield put(participationRequest());

    const requestUrl = payload.participate
      ? `${RUNNING_AARHUS_FUNCTIONS_URL}/saveParticipation`
      : `${RUNNING_AARHUS_FUNCTIONS_URL}/cancelParticipation`;

    yield axios.post(requestUrl, body);

    const updatedRun = { ...payload, participating: !payload.participating };

    yield put(participationSuccess(updatedRun));
  } catch (error) {
    yield put(participationFailure());
  }
}
