import { AppHeader } from "components";
import { Content, Container } from "native-base";
import { Action } from "actions/common";
import * as actions from "actions";
import React from "react";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js";

interface PropsConnectedState {
  value: number;
}
interface PropsConnectedDispatcher {
  facebookLogin: () => Action<void>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string) => void };
}

class LoginScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.facebookLogin();
    AsyncStorage.removeItem("fb_token");
  }

  onShowResultPress = () => {
    this.props.navigation.navigate("ResultScreen");
  };

  render(): JSX.Element {
    return (
      <Container>
        <AppHeader headerText={i18n.t("authHeader")} />
        <Content padder />
      </Container>
    );
  }
}

export default connect(
  null,
  actions
)(LoginScreen as React.ComponentClass<Props>);
