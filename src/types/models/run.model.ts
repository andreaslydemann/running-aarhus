import { Coordinate } from "../common";

export type RunModel = {
  cancelled: boolean;
  date: Date;
  durationInMins: number;
  id: string;
  location: Coordinate;
  name: string;
  notes: string;
  userId: string;
};
