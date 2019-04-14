import { AuthState } from "./auth.state";
import { RunState } from "./run.state";

export interface RootState {
  auth: AuthState;
  run: RunState;
}
