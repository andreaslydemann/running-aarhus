import { Action } from "actions/common";
import { ScheduleState } from "types/states";
import { RunModel } from "types/models";
import { DETAILS_TYPES, SCHEDULE_TYPES } from "actions";
import { getRunsWithUpdatedCancellation } from "utils";

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

function updateCancelledRun(state: ScheduleState, runId: string) {
  const updatedScheduledRuns = getRunsWithUpdatedCancellation(
    state.scheduledRuns,
    runId
  );

  return { ...state, scheduledRuns: updatedScheduledRuns };
}

export default function(
  state: ScheduleState = initialState,
  action: Action<any>
) {
  switch (action.type) {
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS:
      return { ...state, loading: true };
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { ...state, scheduledRuns: action.payload, loading: false };
    case DETAILS_TYPES.PARTICIPATION_SUCCESS:
      return updateParticipation(state, action.payload);
    case DETAILS_TYPES.CANCEL_RUN_SUCCESS:
      return updateCancelledRun(state, action.payload);
    default:
      return state;
  }
}
