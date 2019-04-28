import { Action } from "actions/common";
import { RunState } from "types/states";
import { RUN_TYPES } from "actions";

let initialState: RunState = {
  scheduledRuns: [],
  startDateTime: new Date()
};

export default function(state: RunState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUN_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { scheduledRuns: action.payload };
    case RUN_TYPES.SET_START_DATE_TIME:
      return { ...state, startDateTime: action.payload };
    default:
      return state;
  }
}
