import { RunModel } from "../models";

export type RunState = {
  scheduledRuns: RunModel[];
  startDateTime: string;
};
