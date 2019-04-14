import { Action } from "actions/common";
import { RunsState } from "./states";
import { RUNS_TYPES } from "actions";

let initialState: RunsState = {
  token: ""
};

export default function(state: RunsState = initialState, action: Action<any>) {
  switch (action.type) {
    case RUNS_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { token: action.payload };
    case RUNS_TYPES.GET_SCHEDULED_RUNS_FAILURE:
      return { token: "" };
    default:
      return state;
  }
}
