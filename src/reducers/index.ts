import { combineReducers } from "redux";
import { RootState } from "./states";
import authReducer from "./auth.reducer";
import runReducer from "./run.reducer";

const reducers = combineReducers<RootState>({
  auth: authReducer,
  run: runReducer
});

export default reducers;
