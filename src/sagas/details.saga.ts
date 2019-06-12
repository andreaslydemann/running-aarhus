import { put, takeEvery, all } from "redux-saga/effects";
import {
  DETAILS_TYPES,
  participationFailure,
  participationRequest,
  participationSuccess,
  cancelRunRequest,
  cancelRunFailure,
  cancelRunSuccess
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL, RUN_TYPES } from "constants";
import { getCurrentUser } from "utils";
import axios from "axios";

function getActionTypes(actionType: string): string[] {
  return Object.keys(RUN_TYPES).map(
    runType => `${RUN_TYPES[runType]}_${actionType}`
  );
}

export default function* detailsSaga() {
  yield all([
    takeEvery(
      getActionTypes(DETAILS_TYPES.SAVE_PARTICIPATION),
      changeParticipation
    ),
    takeEvery(
      getActionTypes(DETAILS_TYPES.CANCEL_PARTICIPATION),
      changeParticipation
    ),
    takeEvery(getActionTypes(DETAILS_TYPES.CANCEL_RUN), cancelRun)
  ]);
}

function* changeParticipation({ payload }: any) {
  const { participate, run, runType } = payload;

  console.log(runType);

  const currentUser = getCurrentUser();

  const body = {
    userId: currentUser.uid,
    runId: run.id
  };

  yield put(participationRequest(runType));

  const requestUrl = participate
    ? `${RUNNING_AARHUS_FUNCTIONS_URL}/saveParticipation`
    : `${RUNNING_AARHUS_FUNCTIONS_URL}/cancelParticipation`;

  try {
    yield axios.post(requestUrl, body);
  } catch (error) {
    return yield put(participationFailure(runType));
  }

  const updatedRun = { ...run, participating: !run.participating };

  yield put(participationSuccess(updatedRun, runType));
}

function* cancelRun({ payload }: any) {
  const { runId = "", runType } = payload;
  yield put(cancelRunRequest(runType));

  try {
    yield axios.post(`${RUNNING_AARHUS_FUNCTIONS_URL}/cancelRun`, { runId });
  } catch (error) {
    return yield put(cancelRunFailure(runType));
  }

  yield put(cancelRunSuccess(runId, runType));
}
