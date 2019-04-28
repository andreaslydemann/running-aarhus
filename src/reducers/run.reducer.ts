import { Action } from "actions/common";
import { RunState } from "types/states";
import { RUN_TYPES } from "actions";

const initialState: RunState = {
  scheduledRuns: [],
  startDateTime: new Date().toDateString(),
  title: "",
  description: "",
  paceEnabled: false,
  pace: 6.0
};

function increasePace(state: RunState) {
  if (state.pace >= 10) {
    return state;
  }

  return { ...state, pace: Math.round((state.pace + 0.05) * 100) / 100 };
}

function decreasePace(state: RunState) {
  if (state.pace <= 0) {
    return state;
  }

  return { ...state, pace: Math.round((state.pace - 0.05) * 100) / 100 };
}

export default function(state: RunState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUN_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { ...state, scheduledRuns: action.payload };
    case RUN_TYPES.SET_START_DATE_TIME:
      return { ...state, startDateTime: action.payload };
    case RUN_TYPES.SET_TITLE:
      return { ...state, title: action.payload };
    case RUN_TYPES.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case RUN_TYPES.TOGGLE_PACE:
      return { ...state, paceEnabled: !state.paceEnabled };
    case RUN_TYPES.INCREASE_PACE:
      return increasePace(state);
    case RUN_TYPES.DECREASE_PACE:
      return decreasePace(state);
    default:
      return state;
  }
}
