import { Action } from "actions/common";
import { RunState } from "types/states";
import { RUN_TYPES } from "actions";
import moment from "moment";
import { calculateEndDateTime } from "utils";
import { RouteDetails } from "../types/common";

const initialState: RunState = {
  loading: false,
  scheduledRuns: [],
  startDateTime: moment(new Date()).format("LLLL"),
  title: "",
  description: "",
  paceEnabled: false,
  pace: 6.0,
  routeDetails: null
};

function updateEndDateTime(
  pace: number,
  startDateTime: string,
  routeDetails: RouteDetails | null
) {
  if (!(routeDetails && startDateTime && pace)) return null;

  const endDateTime = calculateEndDateTime(
    startDateTime,
    pace,
    routeDetails.distance
  );

  return {
    ...routeDetails,
    endDateTime
  };
}

function increasePace(state: RunState) {
  if (state.pace >= 10) {
    return state;
  }

  const pace = Math.round((state.pace + 0.05) * 100) / 100;
  const routeDetails = updateEndDateTime(
    pace,
    state.startDateTime,
    state.routeDetails
  );

  return { ...state, pace, routeDetails };
}

function decreasePace(state: RunState) {
  if (state.pace <= 0) {
    return state;
  }

  const pace = Math.round((state.pace - 0.05) * 100) / 100;
  const routeDetails = updateEndDateTime(
    pace,
    state.startDateTime,
    state.routeDetails
  );

  return { ...state, pace, routeDetails };
}

function setStartDateTime(state: RunState, startDateTime: string) {
  const routeDetails = updateEndDateTime(
    state.pace,
    startDateTime,
    state.routeDetails
  );

  return { ...state, startDateTime, routeDetails };
}

function togglePace(state: RunState) {
  const routeDetails = updateEndDateTime(
    state.pace,
    state.startDateTime,
    state.routeDetails
  );

  return { ...state, paceEnabled: !state.paceEnabled, routeDetails };
}

export default function(state: RunState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUN_TYPES.GET_SCHEDULED_RUNS_REQUEST:
      return { ...state, loading: true };
    case RUN_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { ...state, scheduledRuns: action.payload, loading: false };
    case RUN_TYPES.SET_START_DATE_TIME:
      return setStartDateTime(state, action.payload);
    case RUN_TYPES.SET_TITLE:
      return { ...state, title: action.payload };
    case RUN_TYPES.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case RUN_TYPES.TOGGLE_PACE:
      return togglePace(state);
    case RUN_TYPES.INCREASE_PACE:
      return increasePace(state);
    case RUN_TYPES.DECREASE_PACE:
      return decreasePace(state);
    case RUN_TYPES.SET_ROUTE:
      return { ...state, routeDetails: action.payload };
    default:
      return state;
  }
}
