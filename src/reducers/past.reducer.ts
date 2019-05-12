import { Action } from "actions/common";
import { PastState } from "types/states";
import { PAST_TYPES } from "actions";

const initialState: PastState = {
  error: false,
  loading: false,
  pastRuns: [],
  selectedRun: {}
};

export default function(state: PastState = initialState, action: Action<any>) {
  switch (action.type) {
    case PAST_TYPES.GET_PAST_RUNS_REQUEST:
      return { ...state, loading: true };
    case PAST_TYPES.GET_PAST_RUNS_SUCCESS:
      return { ...state, pastRuns: action.payload, loading: false };
    case PAST_TYPES.SET_PAST_RUN:
      return { ...state, selectedRun: action.payload };
    default:
      return state;
  }
}
