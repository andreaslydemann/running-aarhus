export type Coordinate = {
  latitude: number;
  longitude: number;
};

export interface RouteDetails {
  coordinates?: Coordinate[];
  meetingPoint: string;
  distance: number;
  endDateTime?: string;
}
