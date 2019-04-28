import { RunModel } from "../models";

export type RunState = {
  scheduledRuns: RunModel[];
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
};
