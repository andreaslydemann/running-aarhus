import { PastState } from "types/states";
import { Action } from "types/common";
import { PAST_TYPES } from "actions";

const initialState: PastState = {
  error: false,
  loading: false,
  pastRuns: []
};

export default (state: PastState = initialState, action: Action<any>) => {
  switch (action.type) {
    case PAST_TYPES.GET_INITIAL_STATE:
      return initialState;
    case PAST_TYPES.GET_PAST_RUNS:
      return { ...state, loading: true };
    case PAST_TYPES.GET_PAST_RUNS_SUCCESS:
      return { ...state, pastRuns: action.payload, loading: false };
    case PAST_TYPES.GET_PAST_RUNS_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
