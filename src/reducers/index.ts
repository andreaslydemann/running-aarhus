import { combineReducers } from "redux";
import { RootState } from "types/states";
import authReducer from "./auth.reducer";
import runReducer from "./run.reducer";
import scheduleReducer from "./schedule.reducer";

const reducers = combineReducers<RootState>({
  auth: authReducer,
  run: runReducer,
  schedule: scheduleReducer
});

export default reducers;
