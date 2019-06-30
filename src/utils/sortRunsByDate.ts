import { RunModel } from "types/models";

export function sortRunsByDate(runs: RunModel[]) {
  return runs.sort((run1: RunModel, run2: RunModel) => {
    // @ts-ignore
    return new Date(run1.startDateTime) - new Date(run2.startDateTime);
  });
}
