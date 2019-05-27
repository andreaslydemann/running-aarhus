import { AuthState } from "./auth.state";
import { RunState } from "./run.state";
import { ScheduleState } from "./schedule.state";
import { PlanningState } from "./planning.state";
import { PastState } from "./past.state";
import { DetailsState } from "./details.state";

export interface RootState {
  auth: AuthState;
  run: RunState;
  schedule: ScheduleState;
  planning: PlanningState;
  past: PastState;
  details: DetailsState;
}
