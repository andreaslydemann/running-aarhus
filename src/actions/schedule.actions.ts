import { Action } from "./common";

export const SCHEDULE_TYPES = {
  GET_SCHEDULED_RUNS_REQUEST: "GET_SCHEDULED_RUNS_REQUEST",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE",
  SET_SCHEDULED_RUN: "SET_SCHEDULED_RUN"
};

export const getScheduledRuns = (): Action<void> => {
  return {
    type: SCHEDULE_TYPES.GET_SCHEDULED_RUNS_REQUEST
  };
};

export const getScheduledRunsSuccess = (runs: any): Action<any> => {
  return {
    type: SCHEDULE_TYPES.GET_SCHEDULED_RUNS_SUCCESS,
    payload: runs
  };
};

export const setScheduledRun = (run: any) => {
  return {
    type: SCHEDULE_TYPES.SET_SCHEDULED_RUN,
    payload: run
  };
};
