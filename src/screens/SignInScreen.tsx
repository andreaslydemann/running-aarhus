import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Action } from "actions/common";
import * as actions from "actions";
import { AuthState } from "reducers/states";
import React from "react";
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
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signIn}>
          <Text>{i18n.t("signIn")}</Text>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center"
  }
});
