import { RunModel } from "../models";
import { RouteDetails } from "types/common";

export type RunState = {
  loading: boolean;
  scheduledRuns: RunModel[];
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
};
