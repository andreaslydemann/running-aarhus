import { Action } from "actions/common";
import { PastState } from "types/states";
import { PAST_TYPES } from "actions";
import { GET_INITIAL_STATE } from "constants";

const initialState: PastState = {
  error: false,
  loading: false,
  pastRuns: []
};

export default function(state: PastState = initialState, action: Action<any>) {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return initialState;
    case PAST_TYPES.GET_PAST_RUNS:
      return { ...state, loading: true };
    case PAST_TYPES.GET_PAST_RUNS_SUCCESS:
      return { ...state, pastRuns: action.payload, loading: false };
    default:
      return state;
  }
}
