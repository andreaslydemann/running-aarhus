import { Action } from "./common";

export const RUN_TYPES = {
  GET_SCHEDULED_RUNS_REQUEST: "GET_SCHEDULED_RUNS_REQUEST",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE"
};

export const getScheduledRuns = (): Action<void> => {
  return {
    type: RUN_TYPES.GET_SCHEDULED_RUNS_REQUEST
  };
};

export const getScheduledRunsSuccess = (runs: any): Action<any> => {
  return {
    type: RUN_TYPES.GET_SCHEDULED_RUNS_SUCCESS,
    payload: runs
  };
};
