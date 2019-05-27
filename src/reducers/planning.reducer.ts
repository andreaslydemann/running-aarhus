import { Action } from "actions/common";
import { PlanningState } from "types/states";
import { PLANNING_TYPES } from "actions";
import { Item } from "../types/common";
import { RunModel } from "../types/models";

const initialState: PlanningState = {
  error: false,
  loading: false,
  upcomingRuns: [],
  myRuns: [],
  selectedItem: Item.Left
};

function setUpcomingRuns(
  state: PlanningState,
  runs: RunModel[],
  filterMyRuns: boolean
) {
  if (filterMyRuns) {
    return { ...state, myRuns: runs, loading: false };
  } else {
    return { ...state, upcomingRuns: runs, loading: false };
  }
}
export default function(
  state: PlanningState = initialState,
  action: Action<any>
) {
  switch (action.type) {
    case PLANNING_TYPES.GET_UPCOMING_RUNS_REQUEST:
      return { ...state, loading: true };
    case PLANNING_TYPES.GET_UPCOMING_RUNS_SUCCESS:
      return setUpcomingRuns(
        state,
        action.payload.runs,
        action.payload.filterMyRuns
      );
    case PLANNING_TYPES.SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };
    default:
      return state;
  }
}
