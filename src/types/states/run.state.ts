import { RouteDetails } from "types/common";

export type RunState = {
  id: string;
  error: boolean;
  loading: boolean;
  startDateTime: Date;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
  participating: boolean;
  participants: any;
  cancelled: boolean;
  userId: string;
};
