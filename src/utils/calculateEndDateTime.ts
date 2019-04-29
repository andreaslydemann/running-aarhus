import { Localization } from "expo";

export function calculateEndDateTime(
  startDateTime: string,
  pace: number,
  distance: number = 0
) {
  if (!pace) return;

  const date = new Date(startDateTime);
  date.setMinutes(date.getMinutes() + pace * distance);
  return date.toLocaleTimeString(Localization.locale, {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });
}
