import { RunModel } from "../models";

export type PastState = {
  error: boolean;
  loading: boolean;
  pastRuns: RunModel[];
};
