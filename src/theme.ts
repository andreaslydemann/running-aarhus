import baseStyled, {
  ReactNativeStyledInterface
} from "styled-components/native";

export const theme = {
  primary: "#002B39",
  darkShade: "#065D6F",
  darkAccent: "#043C47",
  activeTint: "#FFFFFF",
  inactiveTint: "#809DA2",
  info: "#E8F1F2",
  success: "#88D498",
  warning: "#F77F00",
  danger: "#D62828"
};

export type Theme = typeof theme;
export const styled = baseStyled as ReactNativeStyledInterface<Theme>;
