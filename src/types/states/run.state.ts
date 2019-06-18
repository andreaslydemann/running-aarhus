import { RouteDetails } from "types/common";

export type RunState = {
  id: string;
  error: boolean;
  loading: boolean;
  startDateTime: Date;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number | null;
  routeDetails: RouteDetails | null;
};
