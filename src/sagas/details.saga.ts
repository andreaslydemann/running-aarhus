import { put, takeEvery, all } from "redux-saga/effects";
import {
  DETAILS_TYPES,
  participationFailure,
  participationRequest,
  participationSuccess,
  cancelRunFailure,
  cancelRunSuccess
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getCurrentUser } from "utils";
import axios from "axios";
import { Action } from "../actions/common";

export default function* detailsSaga() {
  yield all([
    takeEvery(DETAILS_TYPES.SAVE_PARTICIPATION, changeParticipation),
    takeEvery(DETAILS_TYPES.CANCEL_PARTICIPATION, changeParticipation),
    takeEvery(DETAILS_TYPES.CANCEL_RUN_REQUEST, cancelRun)
  ]);
}

function* changeParticipation({ payload }: any) {
  const { participate, run } = payload;

  const currentUser = getCurrentUser();

  const body = {
    userId: currentUser.uid,
    runId: run.id
  };

  yield put(participationRequest());

  const requestUrl = participate
    ? `${RUNNING_AARHUS_FUNCTIONS_URL}/saveParticipation`
    : `${RUNNING_AARHUS_FUNCTIONS_URL}/cancelParticipation`;

  try {
    yield axios.post(requestUrl, body);
  } catch (error) {
    yield put(participationFailure());
  }

  const updatedRun = { ...run, participating: !run.participating };

  yield put(participationSuccess(updatedRun));
}

function* cancelRun({ payload: runId = "" }: Action<string>) {
  try {
    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/cancelRun`, { runId });
  } catch (error) {
    yield put(cancelRunFailure());
  }

  yield put(cancelRunSuccess(runId));
}
