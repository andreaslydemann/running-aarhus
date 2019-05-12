import { AuthState } from "./auth.state";
import { RunState } from "./run.state";
import { ScheduleState } from "./schedule.state";
import { PlanningState } from "./planning.state";

export interface RootState {
  auth: AuthState;
  run: RunState;
  schedule: ScheduleState;
  planning: PlanningState;
}
