import { combineReducers } from "redux";
import { RootState } from "types/states";
import authReducer from "./auth.reducer";
import runReducer from "./run.reducer";
import scheduleReducer from "./schedule.reducer";
import planningReducer from "./planning.reducer";
import pastReducer from "./past.reducer";
import detailsReducer from "./details.reducer";
import { RUN_TYPES } from "constants";

const reducers = combineReducers<RootState>({
  auth: authReducer,
  run: runReducer,
  schedule: scheduleReducer,
  planning: planningReducer,
  past: pastReducer,
  scheduleDetails: detailsReducer(RUN_TYPES.SCHEDULE),
  planningDetails: detailsReducer(RUN_TYPES.PLANNING),
  pastDetails: detailsReducer(RUN_TYPES.PAST)
});

export default reducers;
