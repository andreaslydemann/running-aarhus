import baseStyled, {
  ReactNativeStyledInterface
} from "styled-components/native";
import { Platform } from "react-native";

export const THEME_PREFIX = Platform.OS === "ios" ? "ios" : "md";

export const theme = {
  primary: "#002B39",
  darkShade: "#065D6F",
  darkAccent: "#043C47",
  activeTint: "#FFFFFF",
  inactiveTint: "#809DA2",
  info: "#E8F1F2",
  success: "#258874",
  warning: "#F77F00",
  submitGradient: ["#258874", "#185A4D"], // #1D6A5A
  danger: "#BD2F3A",
  dangerGradient: ["#BD2F3A", "#7E2027"], // #93252D
  action: "#1481BA",
  actionGradient: ["#1481BA", "#0F5E88"], // #116A99
  actionShadow: "#0e3d5b"
};

export type Theme = typeof theme;
export const styled = baseStyled as ReactNativeStyledInterface<Theme>;
