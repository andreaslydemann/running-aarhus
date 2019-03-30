import { AppHeader } from "components";
import { Content, Container } from "native-base";
import { Action } from "actions/common";
import * as Actions from "actions";
import React from "react";
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

class AuthScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.facebookLogin();
  }

  onShowResultPress = () => {
    this.props.navigation.navigate("ResultScreen");
  };

  render(): JSX.Element {
    return (
      <Container>
        <AppHeader headerText={i18n.t("clickerHeader")} />
        <Content padder />
      </Container>
    );
  }
}

export default connect(
  null,
  Actions
)(AuthScreen as React.ComponentClass<Props>);
