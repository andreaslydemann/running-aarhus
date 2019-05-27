import { Action } from "actions/common";
import { PlanningState } from "types/states";
import { PLANNING_TYPES, RUN_TYPES } from "actions";
import { Item } from "../types/common";
import { RunModel } from "../types/models";
import { getRunsWithUpdatedParticipation } from "utils";

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

function updateParticipation(state: PlanningState, { id }: RunModel) {
  const updatedMyRuns = getRunsWithUpdatedParticipation(state.myRuns, id);
  const updatedUpcomingRuns = getRunsWithUpdatedParticipation(
    state.upcomingRuns,
    id
  );

  return { ...state, upcomingRuns: updatedUpcomingRuns, myRuns: updatedMyRuns };
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
    case RUN_TYPES.PARTICIPATION_SUCCESS:
      return updateParticipation(state, action.payload);
    default:
      return state;
  }
}
