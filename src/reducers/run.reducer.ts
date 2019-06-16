import { RunState } from "types/states";
import { RUN_TYPES } from "actions";
import { calculateEndDateTime } from "utils";
import { RouteDetails, Action } from "types/common";
import { RunModel } from "types/models";

const initialState: RunState = {
  id: "",
  error: false,
  loading: false,
  startDateTime: new Date(),
  title: "",
  description: "",
  paceEnabled: false,
  pace: 6.0,
  routeDetails: null
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

function setRun(state: RunState, run: RunModel) {
  const {
    participating,
    participants,
    cancelled,
    createdBy,
    coordinates,
    meetingPoint,
    distance,
    endDateTime,
    pace,
    startDateTime,
    ...rest
  } = run;

  const routeDetails = {
    coordinates,
    meetingPoint,
    distance,
    endDateTime: new Date(endDateTime)
  };

  return {
    ...state,
    pace,
    paceEnabled: !!pace,
    startDateTime: new Date(startDateTime),
    routeDetails,
    error: false,
    loading: false,
    ...rest
  };
}

export default (state: RunState = initialState, action: Action<any>) => {
  switch (action.type) {
    case RUN_TYPES.GET_INITIAL_STATE:
      return initialState;
    case RUN_TYPES.RESET_RUN:
      return initialState;
    case RUN_TYPES.SAVE_RUN:
      return { ...state, loading: true };
    case RUN_TYPES.SAVE_RUN_SUCCESS:
      return { ...state, loading: false };
    case RUN_TYPES.SAVE_RUN_FAILURE:
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
    case RUN_TYPES.SET_RUN:
      return setRun(state, action.payload);
    default:
      return state;
  }
};
