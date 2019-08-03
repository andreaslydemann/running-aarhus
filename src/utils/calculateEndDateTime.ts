export function calculateEndDateTime(
  startDateTime: Date,
  pace: number,
  distance: number = 0
) {
  if (!pace) return;

  const endDateTime = new Date(startDateTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + pace * distance);

  return endDateTime;
}
