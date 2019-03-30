import { AsyncStorage, StyleSheet } from "react-native";
import { Content, Container, Text, Button } from "native-base";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle } from "components";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class SettingsScreen extends React.Component<Props> {
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render(): JSX.Element {
    return (
      <Container style={styles.container}>
        <ScreenTitle title={i18n.t("settingsTitle")} />

        <Content padder>
          <Button onPress={this.signOut}>
            <Text>{i18n.t("signOut")}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1
  }
});
