import { RunModel } from "../models";

export type ScheduleState = {
  error: boolean;
  loading: boolean;
  scheduledRuns: RunModel[];
};
