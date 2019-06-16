import { ScheduleState } from "types/states";
import { RunModel } from "types/models";
import { Action } from "types/common";
import { DETAILS_TYPES, RUN_TYPES, SCHEDULE_TYPES } from "actions";
import { getRunsWithUpdatedCancellation, getRunsWithUpdatedRun } from "utils";

const initialState: ScheduleState = {
  error: false,
  loading: false,
  scheduledRuns: []
};

function updateParticipation(state: ScheduleState, run: RunModel) {
  const index = state.scheduledRuns.findIndex(
    scheduledRun => scheduledRun.id === run.id
  );

  let newScheduledRuns = state.scheduledRuns.slice();

  if (index !== -1) {
    newScheduledRuns.splice(index, 1);
  } else {
    newScheduledRuns.splice(index, 0, run);
  }

  return { ...state, scheduledRuns: newScheduledRuns };
}

function updateCancellation(state: ScheduleState, runId: string) {
  const updatedScheduledRuns = getRunsWithUpdatedCancellation(
    state.scheduledRuns,
    runId
  );

  return { ...state, scheduledRuns: updatedScheduledRuns };
}

function updateRun(state: ScheduleState, run: RunModel) {
  const updatedRuns = getRunsWithUpdatedRun(state.scheduledRuns, run);

  return { ...state, scheduledRuns: updatedRuns };
}

export default (state: ScheduleState = initialState, action: Action<any>) => {
  switch (action.type) {
    case SCHEDULE_TYPES.GET_INITIAL_STATE:
      return initialState;
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS:
      return { ...state, loading: true };
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { ...state, scheduledRuns: action.payload, loading: false };
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS_FAILURE:
      return { ...state, loading: false, error: true };
    case DETAILS_TYPES.UPDATE_PARTICIPATION:
      return updateParticipation(state, action.payload);
    case DETAILS_TYPES.UPDATE_CANCELLATION:
      return updateCancellation(state, action.payload);
    case RUN_TYPES.SAVE_RUN_SUCCESS:
      return updateRun(state, action.payload);
    default:
      return state;
  }
};
