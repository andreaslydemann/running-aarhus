import { AuthState } from "./auth.state";
import { RunState } from "./RunState";

export interface RootState {
  auth: AuthState;
  run: RunState;
}
