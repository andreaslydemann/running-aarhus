import { Action } from "actions/common";
import { RunsState } from "./states";
import { RUNS_TYPES } from "actions";

let initialState: RunsState = {
  scheduledRuns: null
};

export default function(state: RunsState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUNS_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { scheduledRuns: action.payload };
    default:
      return state;
  }
}
