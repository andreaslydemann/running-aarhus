import { RunModel } from "../models";

export type PlanningState = {
  error: boolean;
  loading: boolean;
  upcomingRuns: RunModel[];
};
