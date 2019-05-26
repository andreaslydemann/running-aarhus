import { Action } from "actions/common";
import { RunState } from "types/states";
import { RUN_TYPES } from "actions";
import { calculateEndDateTime } from "utils";
import { RouteDetails } from "../types/common";

const initialState: RunState = {
  id: "",
  error: false,
  loading: false,
  startDateTime: new Date(),
  title: "",
  description: "",
  paceEnabled: false,
  pace: 6.0,
  routeDetails: null,
  userId: "",
  participating: false,
  participants: [],
  cancelled: false
};

function updateEndDateTime(
  pace: number,
  startDateTime: Date,
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

function setStartDateTime(state: RunState, startDateTime: Date) {
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

function toggleParticipation(state: RunState, runId: string) {
  console.log(runId);
  return { ...state };
}

function setRun(state: RunState, run: any) {
  //console.log(state, run);

  const { coordinates, meetingPoint, distance, endDateTime, ...rest } = run;

  const routeDetails = {
    coordinates,
    meetingPoint,
    distance,
    endDateTime
  };

  return { ...state, routeDetails, ...rest };
}

export default function(state: RunState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUN_TYPES.CREATE_RUN_REQUEST:
      return { ...state, loading: true };
    case RUN_TYPES.CREATE_RUN_SUCCESS:
      return { ...state, loading: false };
    case RUN_TYPES.CREATE_RUN_FAILURE:
      return { ...state, error: true, loading: false };
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
    case RUN_TYPES.TOGGLE_PARTICIPATION:
      return toggleParticipation(state, action.payload);
    case RUN_TYPES.SET_RUN:
      return setRun(state, action.payload);
    default:
      return state;
  }
}
