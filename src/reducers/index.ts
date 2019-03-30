import { combineReducers } from "redux";
import { RootState } from "./states";
import authReducer from "./auth.reducer";

const reducers = combineReducers<RootState>({
  auth: authReducer
});

export default reducers;
