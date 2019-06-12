import { Action } from "actions/common";
import { DETAILS_TYPES, PLANNING_TYPES, RUN_TYPES } from "actions";
import { PlanningState } from "types/states";
import { Item } from "types/common";
import { RunModel } from "types/models";
import {
  getRunsWithUpdatedCancellation,
  getRunsWithUpdatedParticipation,
  getRunsWithUpdatedRun
} from "utils";
import { GET_INITIAL_STATE } from "constants";

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
    if (state.upcomingRuns.length === 0) {
      return { ...state, upcomingRuns: runs, loading: false };
    }

    const upcomingRuns = state.upcomingRuns.map(run => ({ ...run }));

    runs.forEach(run => {
      const index = upcomingRuns.findIndex(
        upcomingRun => upcomingRun.id === run.id
      );

      if (index === -1) {
        upcomingRuns.push(run);
      }
    });

    return { ...state, upcomingRuns, loading: false };
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

function updateCancellation(state: PlanningState, runId: string) {
  const updatedMyRuns = getRunsWithUpdatedCancellation(state.myRuns, runId);
  const updatedUpcomingRuns = state.upcomingRuns.filter(
    (run: RunModel) => run.id !== runId
  );

  return { ...state, upcomingRuns: updatedUpcomingRuns, myRuns: updatedMyRuns };
}

function updateRun(state: PlanningState, run: RunModel) {
  const updatedUpcomingRuns = getRunsWithUpdatedRun(state.upcomingRuns, run);
  const updatedMyRuns = getRunsWithUpdatedRun(state.myRuns, run);

  return { ...state, upcomingRuns: updatedUpcomingRuns, myRuns: updatedMyRuns };
}

export default (state: PlanningState = initialState, action: Action<any>) => {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return initialState;
    case PLANNING_TYPES.GET_UPCOMING_RUNS:
      return { ...state, loading: true };
    case PLANNING_TYPES.GET_UPCOMING_RUNS_SUCCESS:
      return setUpcomingRuns(
        state,
        action.payload.runs,
        action.payload.filterMyRuns
      );
    case PLANNING_TYPES.SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload };
    case DETAILS_TYPES.PARTICIPATION_SUCCESS:
      return updateParticipation(state, action.payload);
    case DETAILS_TYPES.CANCEL_RUN_SUCCESS:
      return updateCancellation(state, action.payload);
    case RUN_TYPES.SAVE_RUN_SUCCESS:
      return updateRun(state, action.payload);
    default:
      return state;
  }
};
