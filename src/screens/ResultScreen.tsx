import { AppHeader } from "components";
import { AsyncStorage } from "react-native";
import { Content, Container, Text, Button } from "native-base";
import React from "react";
import i18n from "i18n-js";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class ResultScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render(): JSX.Element {
    return (
      <Container>
        <AppHeader headerText={i18n.t("resultHeader")} />

        <Content padder>
          <Button onPress={this.signOut}>
            <Text>Sign out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
