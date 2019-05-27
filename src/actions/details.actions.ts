import { Action } from "./common";
import { RunModel } from "../types/models";

export const DETAILS_TYPES = {
  SAVE_PARTICIPATION: "SAVE_PARTICIPATION",
  CANCEL_PARTICIPATION: "CANCEL_PARTICIPATION",
  PARTICIPATION_REQUEST: "PARTICIPATION_REQUEST",
  PARTICIPATION_SUCCESS: "PARTICIPATION_SUCCESS",
  PARTICIPATION_FAILURE: "PARTICIPATION_FAILURE",
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
