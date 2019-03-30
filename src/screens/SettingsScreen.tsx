import { AsyncStorage } from "react-native";
import { Content, Container, Text, Button } from "native-base";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle } from "components";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class SettingsScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render(): JSX.Element {
    return (
      <Container style={{ paddingTop: 40, flex: 1 }}>
        <ScreenTitle title={i18n.t("settingsTitle")} />

        <Content padder>
          <Button onPress={this.signOut}>
            <Text>Sign out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
