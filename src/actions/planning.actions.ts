import { Action } from "./common";
import { Item, RunRequest } from "types/common";
import { RunModel } from "../types/models";

export const PLANNING_TYPES = {
  GET_UPCOMING_RUNS_REQUEST: "GET_UPCOMING_RUNS_REQUEST",
  GET_UPCOMING_RUNS_SUCCESS: "GET_UPCOMING_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_UPCOMING_RUNS_FAILURE",
  SET_UPCOMING_RUN: "SET_UPCOMING_RUN",
  SET_SELECTED_ITEM: "SET_SELECTED_ITEM"
};

export const getUpcomingRuns = (
  numberOfRuns: number,
  offset: string
): Action<RunRequest> => {
  return {
    type: PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST,
    payload: { numberOfRuns, offset }
  };
};

export const getMyRuns = () => {
  return {
    type: PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST,
    payload: { numberOfRuns: 15, offset: 0, filterMyRuns: true }
  };
};

export const getUpcomingRunsSuccess = (
  runs: RunModel[],
  filterMyRuns: boolean
): Action<any> => {
  return {
    type: PLANNING_TYPES.GET_UPCOMING_RUNS_SUCCESS,
    payload: { runs, filterMyRuns }
  };
};

export const setUpcomingRun = (run: any) => {
  return {
    type: PLANNING_TYPES.SET_UPCOMING_RUN,
    payload: run
  };
};

export const setSelectedItem = (item: Item) => {
  return {
    type: PLANNING_TYPES.SET_SELECTED_ITEM,
    payload: item
  };
};
