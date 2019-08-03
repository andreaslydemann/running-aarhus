import { RunModel } from "../models";

export type DetailsState = {
  run: RunModel;
  participationLoading: boolean;
  cancellationLoading: boolean;
  success: boolean;
  error: boolean;
};
