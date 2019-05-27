import { RunModel } from "../models";

export type DetailsState = {
  run: RunModel;
  error: boolean;
  loading: boolean;
};
