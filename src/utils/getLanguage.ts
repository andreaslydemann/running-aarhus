import { Localization } from "expo";

export function getLanguage() {
  return Localization.locale.split("-")[0] === "da" ? "da" : "en";
}
