import { RunModel } from "../models";
import { Item } from "../common";

export type PlanningState = {
  error: boolean;
  loading: boolean;
  upcomingRuns: RunModel[];
  myRuns: RunModel[];
  selectedItem: Item;
};
