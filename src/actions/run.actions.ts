import { RouteDetails, Action } from "types/common";
import { RunModel } from "../types/models";

export const RUN_TYPES = {
  GET_INITIAL_STATE: "GET_INITIAL_STATE",
  RESET_RUN: "RESET_RUN",
  SAVE_RUN: "SAVE_RUN",
  SAVE_RUN_SUCCESS: "SAVE_RUN_SUCCESS",
  SAVE_RUN_FAILURE: "SAVE_RUN_FAILURE",
  SET_START_DATE_TIME: "SET_START_DATE_TIME",
  SET_TITLE: "SET_TITLE",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  TOGGLE_PACE: "TOGGLE_PACE",
  INCREASE_PACE: "INCREASE_PACE",
  DECREASE_PACE: "DECREASE_PACE",
  SET_ROUTE: "SET_ROUTE",
  SET_RUN: "SET_RUN"
};

export const resetRun = (): Action<void> => {
  return {
    type: RUN_TYPES.RESET_RUN
  };
};

export const saveRun = (run: any, runType?: string): Action<any> => {
  return {
    type: RUN_TYPES.SAVE_RUN,
    payload: { run, runType }
  };
};

export const saveRunSuccess = (
  run: RunModel,
  isNewRun: boolean
): Action<any> => {
  return {
    type: RUN_TYPES.SAVE_RUN_SUCCESS,
    payload: { run, isNewRun }
  };
};

export const saveRunFailure = (): Action<void> => {
  return {
    type: RUN_TYPES.SAVE_RUN_FAILURE
  };
};

export const setStartDateTime = (dateTime: Date) => {
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

export const setRun = (run: RunModel): Action<RunModel> => {
  return {
    type: RUN_TYPES.SET_RUN,
    payload: run
  };
};
