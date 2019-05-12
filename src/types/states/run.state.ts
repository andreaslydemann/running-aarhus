import { RouteDetails } from "types/common";

export type RunState = {
  error: boolean;
  loading: boolean;
  startDateTime: Date;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
};
