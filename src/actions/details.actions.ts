import { Action } from "./common";
import { RunModel } from "../types/models";

export const DETAILS_TYPES = {
  SAVE_PARTICIPATION: "SAVE_PARTICIPATION",
  CANCEL_PARTICIPATION: "CANCEL_PARTICIPATION",
  PARTICIPATION_REQUEST: "PARTICIPATION_REQUEST",
  PARTICIPATION_SUCCESS: "PARTICIPATION_SUCCESS",
  PARTICIPATION_FAILURE: "PARTICIPATION_FAILURE",
  CANCEL_RUN_REQUEST: "CANCEL_RUN_REQUEST",
  CANCEL_RUN_SUCCESS: "CANCEL_RUN_SUCCESS",
  CANCEL_RUN_FAILURE: "CANCEL_RUN_FAILURE",
  SET_DETAILS: "SET_DETAILS"
};

export const saveParticipation = (run: RunModel) => {
  return {
    type: DETAILS_TYPES.SAVE_PARTICIPATION,
    payload: { run, participate: true }
  };
};

export const cancelParticipation = (run: RunModel) => {
  return {
    type: DETAILS_TYPES.CANCEL_PARTICIPATION,
    payload: { run, participate: false }
  };
};

export const participationRequest = (): Action<void> => {
  return {
    type: DETAILS_TYPES.PARTICIPATION_REQUEST
  };
};

export const participationSuccess = (run: RunModel): Action<RunModel> => {
  return {
    type: DETAILS_TYPES.PARTICIPATION_SUCCESS,
    payload: run
  };
};

export const participationFailure = (): Action<void> => {
  return {
    type: DETAILS_TYPES.PARTICIPATION_FAILURE
  };
};

export const setDetails = (run: RunModel): Action<RunModel> => {
  return {
    type: DETAILS_TYPES.SET_DETAILS,
    payload: run
  };
};

export const cancelRun = (runId: string): Action<string> => {
  return {
    type: DETAILS_TYPES.CANCEL_RUN_REQUEST,
    payload: runId
  };
};

export const cancelRunSuccess = (runId: string): Action<string> => {
  return {
    type: DETAILS_TYPES.CANCEL_RUN_SUCCESS,
    payload: runId
  };
};

export const cancelRunFailure = (): Action<string> => {
  return {
    type: DETAILS_TYPES.CANCEL_RUN_FAILURE
  };
};
