import { TouchableOpacity, Text, Platform } from "react-native";
import { Action } from "actions/common";
import * as actions from "actions";
import { AuthState } from "reducers/states";
import React from "react";
import { connect } from "react-redux";
import i18n from "i18n-js";
import { styled } from "theme";

interface PropsConnectedState {
  token: string;
}

interface PropsConnectedDispatcher {
  signIn: () => Action<void>;
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
    this.props.signIn();
  };

  render(): JSX.Element {
    return (
      <Wrapper>
        <StyledImage source={require("../../assets/logo.png")} />
        <Heading>WELCOME</Heading>
        <StyledText>Find people to run with</StyledText>
        <StyledText>Create or find you next run</StyledText>
        <Bottom isAndroid={Platform.OS === "android"}>
          <TouchableOpacity onPress={this.signIn}>
            <Text>{i18n.t("signIn")}</Text>
          </TouchableOpacity>
        </Bottom>
      </Wrapper>
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

const Heading = styled.Text`
  margin-top: 40;
`;

const StyledText = styled.Text`
  margin-horizontal: 8px;
  margin-vertical: 10px;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  margin-top: 50px;
  width: 160px;
  height: 160px;
`;

interface BottomProps {
  isAndroid: boolean;
}
const Bottom = styled.View<BottomProps>`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: ${props => (props.isAndroid ? "14px" : "36px")};
`;
