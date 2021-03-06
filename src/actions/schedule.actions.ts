import { Action } from "types/common";

export const SCHEDULE_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  GET_SCHEDULED_RUNS: "GET_SCHEDULED_RUNS",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE",
  SET_SCHEDULED_RUN: "SET_SCHEDULED_RUN"
};

export const getScheduledRuns = (): Action<void> => {
  return {
    type: SCHEDULE_TYPES.GET_SCHEDULED_RUNS
  };
};

export const getScheduledRunsSuccess = (runs: any): Action<any> => {
  return {
    type: SCHEDULE_TYPES.GET_SCHEDULED_RUNS_SUCCESS,
    payload: runs
  };
};

export const getScheduledRunsFailure = (): Action<any> => {
  return {
    type: SCHEDULE_TYPES.GET_SCHEDULED_RUNS_FAILURE
  };
};

export const setScheduledRun = (run: any) => {
  return {
    type: SCHEDULE_TYPES.SET_SCHEDULED_RUN,
    payload: run
  };
};
