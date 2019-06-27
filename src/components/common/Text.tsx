import * as React from "react";
import { Text as TextBase, Platform, StyleSheet } from "react-native";

interface Props {
  children: any;
  style?: any;
  numberOfLines?: number;
}

export const DEFAULT_STYLE = {
  ...Platform.select({
    android: {
      fontFamily: "Roboto"
    }
  })
};

const styles = StyleSheet.create({
  text: {
    ...DEFAULT_STYLE
  }
});

const Text = ({ children, style, numberOfLines }: Props) => (
  <TextBase style={[styles.text, style]} numberOfLines={numberOfLines}>
    {children}
  </TextBase>
);

export default Text;
