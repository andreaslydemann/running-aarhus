import { RunModel } from "../types/models";

export function getRunsWithUpdatedCancellation(
  runs: RunModel[],
  runId: string
) {
  return runs.map(run => {
    if (run.id !== runId) return run;

    return {
      ...run,
      cancelled: true
    };
  });
}
