import { RunModel } from "types/models";

export function getRunsWithUpdatedParticipation(
  runs: RunModel[],
  newRun: RunModel
) {
  return runs.map(run => {
    if (run.id !== newRun.id) return run;

    return newRun;
  });
}
