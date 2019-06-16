import { Action } from "types/common";
import { RunModel } from "types/models";

export const DETAILS_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  SAVE_PARTICIPATION: "SAVE_PARTICIPATION",
  CANCEL_PARTICIPATION: "CANCEL_PARTICIPATION",
  PARTICIPATION_REQUEST: "PARTICIPATION_REQUEST",
  PARTICIPATION_SUCCESS: "PARTICIPATION_SUCCESS",
  PARTICIPATION_FAILURE: "PARTICIPATION_FAILURE",
  CANCEL_RUN: "CANCEL_RUN",
  CANCEL_RUN_REQUEST: "CANCEL_RUN_REQUEST",
  CANCEL_RUN_SUCCESS: "CANCEL_RUN_SUCCESS",
  CANCEL_RUN_FAILURE: "CANCEL_RUN_FAILURE",
  SET_DETAILS: "SET_DETAILS",
  UPDATE_PARTICIPATION: "UPDATE_PARTICIPATION",
  UPDATE_CANCELLATION: "UPDATE_CANCELLATION"
};

export const saveParticipation = (run: RunModel, runType: string) => {
  return {
    type: `${runType}_${DETAILS_TYPES.SAVE_PARTICIPATION}`,
    payload: { run, participate: true, runType }
  };
};

export const cancelParticipation = (run: RunModel, runType: string) => {
  return {
    type: `${runType}_${DETAILS_TYPES.CANCEL_PARTICIPATION}`,
    payload: { run, participate: false, runType }
  };
};

export const participationRequest = (runType: string): Action<void> => {
  return {
    type: `${runType}_${DETAILS_TYPES.PARTICIPATION_REQUEST}`
  };
};

export const participationSuccess = (
  run: RunModel,
  runType: string
): Action<RunModel> => {
  return {
    type: `${runType}_${DETAILS_TYPES.PARTICIPATION_SUCCESS}`,
    payload: run
  };
};

export const participationFailure = (runType: string): Action<void> => {
  return {
    type: `${runType}_${DETAILS_TYPES.PARTICIPATION_FAILURE}`
  };
};

export const setDetails = (
  run: RunModel,
  runType: string
): Action<RunModel> => {
  return {
    type: `${runType}_${DETAILS_TYPES.SET_DETAILS}`,
    payload: run
  };
};

export const cancelRun = (runId: string, runType: string): Action<any> => {
  return {
    type: `${runType}_${DETAILS_TYPES.CANCEL_RUN}`,
    payload: { runId, runType }
  };
};

export const cancelRunRequest = (runType: string): Action<void> => {
  return {
    type: `${runType}_${DETAILS_TYPES.CANCEL_RUN_REQUEST}`
  };
};

export const cancelRunSuccess = (
  runId: string,
  runType: string
): Action<string> => {
  return {
    type: `${runType}_${DETAILS_TYPES.CANCEL_RUN_SUCCESS}`,
    payload: runId
  };
};

export const cancelRunFailure = (runType: string): Action<string> => {
  return {
    type: `${runType}_${DETAILS_TYPES.CANCEL_RUN_FAILURE}`
  };
};

export const updateParticipation = (run: RunModel) => {
  return {
    type: DETAILS_TYPES.UPDATE_PARTICIPATION,
    payload: run
  };
};

export const updateCancellation = (runId: string) => {
  return {
    type: DETAILS_TYPES.UPDATE_CANCELLATION,
    payload: runId
  };
};
