import { RunModel } from "../types/models";

export function getRunsWithUpdatedParticipation(
  runs: RunModel[],
  runId: string
) {
  return runs.map(run => {
    if (run.id !== runId) {
      return run;
    }

    return {
      ...run,
      participating: !run.participating
    };
  });
}
