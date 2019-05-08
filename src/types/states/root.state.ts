import { AuthState } from "./auth.state";
import { RunState } from "./run.state";
import { ScheduleState } from "./schedule.state";

export interface RootState {
  auth: AuthState;
  run: RunState;
  schedule: ScheduleState;
}
