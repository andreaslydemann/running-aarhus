import { AppHeader } from "components";
import { Content, Container } from "native-base";
import { Action } from "actions/common";
import * as actions from "actions";
import { AuthState } from "reducers/states";
import React from "react";
//import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import i18n from "i18n-js";

interface PropsConnectedState {
  token: string;
}
interface PropsConnectedDispatcher {
  facebookLogin: () => Action<void>;
}
interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string) => void };
}

class SignInScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    //AsyncStorage.removeItem("fb_token");
  }

  componentWillReceiveProps(nextProps: Props) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props: Props) {
    if (props.token) {
      this.props.navigation.navigate("Schedule");
    }
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

const mapStateToProps = ({
  auth
}: {
  auth: AuthState;
}): PropsConnectedState => {
  return {
    token: auth.token
  };
};

export default connect(
  mapStateToProps,
  actions
)(SignInScreen as React.ComponentClass<Props>);
