import { combineReducers } from "redux";
import { RootState } from "./states";
import counterReducer from "./counter.reducer";
import authReducer from "./auth.reducer";

const reducers = combineReducers<RootState>({
  counter: counterReducer,
  auth: authReducer
});

export default reducers;
