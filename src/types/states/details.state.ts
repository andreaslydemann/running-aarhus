import { RunModel } from "../models";

export type DetailsState = {
  run: RunModel;
  loading: boolean;
  success: boolean;
  error: boolean;
};
