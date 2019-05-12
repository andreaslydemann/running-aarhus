import { combineReducers } from "redux";
import { RootState } from "types/states";
import authReducer from "./auth.reducer";
import runReducer from "./run.reducer";
import scheduleReducer from "./schedule.reducer";
import planningReducer from "./planning.reducer";

const reducers = combineReducers<RootState>({
  auth: authReducer,
  run: runReducer,
  schedule: scheduleReducer,
  planning: planningReducer
});

export default reducers;
