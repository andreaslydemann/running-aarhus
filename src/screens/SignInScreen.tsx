import { AppHeader } from "components";
import { Content, Container, Button, Text } from "native-base";
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
  facebookSignIn: () => Action<void>;
}
interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string) => void };
}

class SignInScreen extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props: Props) {
    if (props.token) {
      this.props.navigation.navigate("App");
    }
  }

  signIn = () => {
    this.props.facebookSignIn();
  };

  render(): JSX.Element {
    return (
      <Container>
        <AppHeader headerText={i18n.t("authHeader")} />
        <Content padder>
          <Button transparent onPress={this.signIn}>
            <Text>Sign in</Text>
          </Button>
        </Content>
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
