import { combineReducers } from "redux";
import { RootState } from "./states";
import authReducer from "./auth.reducer";
import runsReducer from "./runs.reducer";

const reducers = combineReducers<RootState>({
  auth: authReducer,
  runs: runsReducer
});

export default reducers;
