import baseStyled, {
  ReactNativeStyledInterface
} from "styled-components/native";

export const theme = {
  primary: "#0B4526",
  darkShade: "#04381C",
  darkAccent: "#002310",
  activeTint: "white",
  inactiveTint: "#4E916D",
  info: "#232525",
  success: "#5e9850",
  warning: "#db8818",
  danger: "#f44336"
};

export type Theme = typeof theme;
export const styled = baseStyled as ReactNativeStyledInterface<Theme>;
