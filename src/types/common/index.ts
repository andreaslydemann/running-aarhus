export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type RunRequest = {
  numberOfRuns: number;
  offset: string;
  filterMyRuns?: boolean;
};

export interface RouteDetails {
  coordinates?: Coordinate[];
  meetingPoint: string;
  distance: number;
  endDateTime?: Date | string;
}

export enum Item {
  Left,
  Right
}
