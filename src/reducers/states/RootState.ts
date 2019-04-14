import { AuthState } from "./AuthState";
import { RunsState } from "./RunsState";

export interface RootState {
  auth: AuthState;
  runs: RunsState;
}
