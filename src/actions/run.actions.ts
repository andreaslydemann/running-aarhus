import { Action } from "./common";
import { RouteDetails } from "types/common";

export const RUN_TYPES = {
  GET_SCHEDULED_RUNS_REQUEST: "GET_SCHEDULED_RUNS_REQUEST",
  GET_SCHEDULED_RUNS_SUCCESS: "GET_SCHEDULED_RUNS_SUCCESS",
  GET_SCHEDULED_RUNS_FAILURE: "GET_SCHEDULED_RUNS_FAILURE",
  CREATE_RUN_REQUEST: "CREATE_RUN_REQUEST",
  CREATE_RUN_SUCCESS: "CREATE_RUN_SUCCESS",
  CREATE_RUN_FAILURE: "CREATE_RUN_FAILURE",
  SET_START_DATE_TIME: "SET_START_DATE_TIME",
  SET_TITLE: "SET_TITLE",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  TOGGLE_PACE: "TOGGLE_PACE",
  INCREASE_PACE: "INCREASE_PACE",
  DECREASE_PACE: "DECREASE_PACE",
  SET_ROUTE: "SET_ROUTE"
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

export const createRun = (run: any): Action<any> => {
  return {
    type: RUN_TYPES.CREATE_RUN_REQUEST,
    payload: run
  };
};

export const createRunSuccess = (): Action<void> => {
  return {
    type: RUN_TYPES.CREATE_RUN_SUCCESS
  };
};

export const setStartDateTime = (dateTime: string) => {
  return {
    type: RUN_TYPES.SET_START_DATE_TIME,
    payload: dateTime
  };
};

export const setTitle = (title: string) => {
  return {
    type: RUN_TYPES.SET_TITLE,
    payload: title
  };
};

export const setDescription = (description: string) => {
  return {
    type: RUN_TYPES.SET_DESCRIPTION,
    payload: description
  };
};

export const togglePace = () => {
  return {
    type: RUN_TYPES.TOGGLE_PACE
  };
};

export const increasePace = () => {
  return {
    type: RUN_TYPES.INCREASE_PACE
  };
};

export const decreasePace = () => {
  return {
    type: RUN_TYPES.DECREASE_PACE
  };
};

export const setRoute = (routeDetails: RouteDetails) => {
  return {
    type: RUN_TYPES.SET_ROUTE,
    payload: routeDetails
  };
};
