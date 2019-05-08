import { Action } from "actions/common";
import { ScheduleState } from "types/states";
import { SCHEDULE_TYPES } from "actions";

const initialState: ScheduleState = {
  error: false,
  loading: false,
  scheduledRuns: [],
  selectedRun: {}
};

export default function(
  state: ScheduleState = initialState,
  action: Action<any>
) {
  switch (action.type) {
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS_REQUEST:
      return { ...state, loading: true };
    case SCHEDULE_TYPES.GET_SCHEDULED_RUNS_SUCCESS:
      return { ...state, scheduledRuns: action.payload, loading: false };
    case SCHEDULE_TYPES.SET_SELECTED_RUN:
      return { ...state, selectedRun: action.payload };
    default:
      return state;
  }
}
