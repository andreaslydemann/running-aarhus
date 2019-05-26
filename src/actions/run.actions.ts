import { Action } from "./common";
import { RouteDetails } from "types/common";

export const RUN_TYPES = {
  CREATE_RUN_REQUEST: "CREATE_RUN_REQUEST",
  CREATE_RUN_SUCCESS: "CREATE_RUN_SUCCESS",
  CREATE_RUN_FAILURE: "CREATE_RUN_FAILURE",
  SET_START_DATE_TIME: "SET_START_DATE_TIME",
  SET_TITLE: "SET_TITLE",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  TOGGLE_PACE: "TOGGLE_PACE",
  INCREASE_PACE: "INCREASE_PACE",
  DECREASE_PACE: "DECREASE_PACE",
  SET_ROUTE: "SET_ROUTE",
  SAVE_PARTICIPATION: "SAVE_PARTICIPATION",
  CANCEL_PARTICIPATION: "CANCEL_PARTICIPATION",
  TOGGLE_PARTICIPATION: "TOGGLE_PARTICIPATION",
  SET_RUN: "SET_RUN"
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

export const createRunFailure = (): Action<void> => {
  return {
    type: RUN_TYPES.CREATE_RUN_FAILURE
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

export const saveParticipation = (runId: string) => {
  return {
    type: RUN_TYPES.SAVE_PARTICIPATION,
    payload: runId
  };
};

export const cancelParticipation = (runId: string) => {
  return {
    type: RUN_TYPES.CANCEL_PARTICIPATION,
    payload: runId
  };
};

export const toggleParticipation = (runId: string): Action<string> => {
  return {
    type: RUN_TYPES.TOGGLE_PARTICIPATION,
    payload: runId
  };
};

export const setRun = (run: any): Action<any> => {
  return {
    type: RUN_TYPES.SET_RUN,
    payload: run
  };
};
