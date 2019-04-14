import { Action } from "actions/common";
import { RunState } from "./states";
import { RUN_TYPES } from "actions";

let initialState: RunState = {
  scheduledRuns: null
};

export default function(state: RunState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUN_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { scheduledRuns: action.payload };
    default:
      return state;
  }
}
