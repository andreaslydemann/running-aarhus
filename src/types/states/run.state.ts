import { RunModel } from "../models";
import { RouteDetails } from "types/common";

export type RunState = {
  scheduledRuns: RunModel[];
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
};
