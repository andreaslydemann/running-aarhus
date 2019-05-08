import { RouteDetails } from "types/common";

export type RunState = {
  error: boolean;
  loading: boolean;
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
};
