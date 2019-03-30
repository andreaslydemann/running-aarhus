import { StyleSheet } from "react-native";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class PlanningScreen extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <ScreenBackground style={styles.container}>
        <ScreenTitle title={i18n.t("planningTitle")} />
      </ScreenBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1
  }
});
