import { Action } from "./common";

export const RUN_TYPES = {
  GET_SCHEDULED_RUNS_REQUEST: "GET_SCHEDULED_RUNS_REQUEST",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE",
  SET_START_DATE_TIME: "SET_START_DATE_TIME"
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

export const setStartDateTime = (dateTime: Date) => {
  return {
    type: RUN_TYPES.SET_START_DATE_TIME,
    payload: dateTime
  };
};
