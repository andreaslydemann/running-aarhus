import * as React from "react";
import { Text as TextBase, Platform, StyleSheet } from "react-native";

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

const Text = (props: any) => (
  <TextBase style={[styles.text, props.style]} {...props} />
);

export default Text;
