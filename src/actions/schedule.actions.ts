import { Action } from "./common";

export const SCHEDULE_TYPES = {
  GET_SCHEDULED_RUNS_REQUEST: "GET_SCHEDULED_RUNS_REQUEST",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE",
  SET_SELECTED_RUN: "SET_SELECTED_RUN"
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

export const setSelectedRun = (run: any) => {
  return {
    type: SCHEDULE_TYPES.SET_SELECTED_RUN,
    payload: run
  };
};
