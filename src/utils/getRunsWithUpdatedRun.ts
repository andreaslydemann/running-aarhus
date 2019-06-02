import { RunModel } from "types/models";

export function getRunsWithUpdatedRun(runs: RunModel[], updatedRun: RunModel) {
  return runs.map(run => {
    if (run.id !== updatedRun.id) return run;

    return updatedRun;
  });
}
