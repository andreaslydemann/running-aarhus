import { put, takeEvery, all, select } from "redux-saga/effects";
import {
  DETAILS_TYPES,
  participationFailure,
  participationRequest,
  participationSuccess,
  cancelRunRequest,
  cancelRunFailure,
  cancelRunSuccess,
  updateParticipation,
  updateCancellation
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL, RUN_TYPES } from "constants";
import { getAuthUser } from "utils";
import axios from "axios";
import { RunModel, UserModel } from "../types/models";

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

  yield put(participationRequest(runType));

  const requestUrl = participate
    ? `${RUNNING_AARHUS_FUNCTIONS_URL}/saveParticipation`
    : `${RUNNING_AARHUS_FUNCTIONS_URL}/cancelParticipation`;

  try {
    const body = {
      userId: getAuthUser().uid,
      runId: run.id
    };

    const currentUser = yield select(state => state.auth.currentUser);

    if (!currentUser) {
      throw Error("Current user not found.");
    }

    yield axios.post(requestUrl, body);

    const updatedRun = updateParticipationInRun(run, currentUser);

    yield put(participationSuccess(updatedRun, runType));
    yield put(updateParticipation(updatedRun));
  } catch (error) {
    return yield put(participationFailure(runType));
  }
}

function updateParticipationInRun(run: RunModel, currentUser: UserModel) {
  const index = run.participants.findIndex(
    (participant: any) => participant.id === currentUser.id
  );

  let newParticipants = run.participants.slice();

  if (index !== -1) {
    newParticipants.splice(index, 1);
  } else {
    newParticipants.splice(index, 0, currentUser);
  }

  return {
    ...run,
    participating: !run.participating,
    participants: newParticipants
  };
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
  yield put(updateCancellation(runId));
}
