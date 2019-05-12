import { Action } from "./common";
import { RunRequest } from "types/common";

export const PLANNING_TYPES = {
  GET_UPCOMING_RUNS_REQUEST: "GET_UPCOMING_RUNS_REQUEST",
  GET_UPCOMING_RUNS_SUCCESS: "GET_UPCOMING_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_UPCOMING_RUNS_FAILURE",
  SET_UPCOMING_RUN: "SET_UPCOMING_RUN"
};

export const getUpcomingRuns = (
  numberOfRuns: number,
  offset: number
): Action<RunRequest> => {
  return {
    type: PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST,
    payload: { numberOfRuns, offset }
  };
};

export const getUpcomingRunsSuccess = (runs: any): Action<any> => {
  return {
    type: PLANNING_TYPES.GET_UPCOMING_RUNS_SUCCESS,
    payload: runs
  };
};

export const setUpcomingRun = (run: any) => {
  return {
    type: PLANNING_TYPES.SET_UPCOMING_RUN,
    payload: run
  };
};
