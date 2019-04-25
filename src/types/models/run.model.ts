export type RunModel = {
  cancelled: boolean;
  date: Date;
  durationInMins: number;
  id: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
  name: string;
  notes: string;
  userId: string;
};
