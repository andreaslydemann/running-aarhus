import { RunModel, UserModel } from "../types/models";

export function addParticipationStatusToRuns(
  runs: RunModel[],
  userId: string
): RunModel[] {
  return runs.map((run: RunModel) => {
    const { participants } = run;

    const participating =
      participants.findIndex(
        (participant: UserModel) => participant.id === userId
      ) !== -1;

    return { participating, ...run };
  });
}
