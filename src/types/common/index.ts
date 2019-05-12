export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type RunRequest = {
  numberOfRuns: number;
  offset: number;
};

export interface RouteDetails {
  coordinates?: Coordinate[];
  meetingPoint: string;
  distance: number;
  endDateTime?: Date | string;
}
