import { Action } from "./common";

export const PAST_TYPES = {
  GET_PAST_RUNS_REQUEST: "GET_PAST_RUNS_REQUEST",
  GET_PAST_RUNS_SUCCESS: "GET_PAST_RUNS_SUCCESS",
  GET_PAST_RUNS_FAILURE: "GET_PAST_RUNS_FAILURE",
  SET_PAST_RUN: "SET_PAST_RUN"
};

export const getPastRuns = (): Action<void> => {
  return {
    type: PAST_TYPES.GET_PAST_RUNS_REQUEST
  };
};

export const getPastRunsSuccess = (runs: any): Action<any> => {
  return {
    type: PAST_TYPES.GET_PAST_RUNS_SUCCESS,
    payload: runs
  };
};

export const setPastRun = (run: any) => {
  return {
    type: PAST_TYPES.SET_PAST_RUN,
    payload: run
  };
};
