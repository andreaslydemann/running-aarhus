import { put, takeLeading, all } from "redux-saga/effects";
import {
  participationFailure,
  participationRequest,
  participationSuccess,
  DETAILS_TYPES
} from "actions";
import { RUNNING_AARHUS_FUNCTIONS_URL } from "constants";
import { getCurrentUser } from "utils";
import axios from "axios";

export default function* detailsSaga() {
  yield all([
    takeLeading(DETAILS_TYPES.SAVE_PARTICIPATION, changeParticipation)
  ]);
  yield all([
    takeLeading(DETAILS_TYPES.CANCEL_PARTICIPATION, changeParticipation)
  ]);
}

function* changeParticipation({ payload }: any) {
  try {
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

    yield axios.post(requestUrl, body);

    const updatedRun = { ...run, participating: !run.participating };

    yield put(participationSuccess(updatedRun));
  } catch (error) {
    yield put(participationFailure());
  }
}
