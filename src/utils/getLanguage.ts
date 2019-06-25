import * as Localization from "expo-localization";

export function getLanguage() {
  return Localization.locale.split("-")[0] === "da" ? "da" : "en";
}
