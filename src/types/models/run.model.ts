import { Coordinate } from "../common";
import { UserModel } from "./user.model";

export type RunModel = {
  id: string;
  title: string;
  description: string;
  pace: number;
  distance: number;
  meetingPoint: string;
  coordinates: Coordinate[];
  startDateTime: string;
  endDateTime: string;
  participants: any;
  participating: boolean;
  cancelled: boolean;
  createdBy: UserModel;
};
