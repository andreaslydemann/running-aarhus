export function addParticipationStatusToRuns(runs: any, userId: string) {
  return runs.map((run: any) => {
    const { participants } = run;
    const participating =
      participants.findIndex(
        (participant: any) => participant.id === userId
      ) !== -1;

    return { participating, ...run };
  });
}
