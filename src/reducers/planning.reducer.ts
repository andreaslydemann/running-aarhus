import { Action } from "actions/common";
import { PlanningState } from "types/states";
import { PLANNING_TYPES } from "actions";

const initialState: PlanningState = {
  error: false,
  loading: false,
  upcomingRuns: [],
  selectedRun: {}
};

export default function(
  state: PlanningState = initialState,
  action: Action<any>
) {
  switch (action.type) {
    case PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST:
      return { ...state, loading: true };
    case PLANNING_TYPES.GET_UPCOMING_RUNS_SUCCESS:
      return { ...state, upcomingRuns: action.payload, loading: false };
    case PLANNING_TYPES.SET_UPCOMING_RUN:
      return { ...state, selectedRun: action.payload };
    default:
      return state;
  }
}
