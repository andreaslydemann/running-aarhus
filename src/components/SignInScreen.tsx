import { Action } from "actions/common";
import * as actions from "actions";
import { AuthState } from "types/states";
import React from "react";
import { connect } from "react-redux";
import { styled } from "theme";
import { ScreenBackground, PushableWrapper } from "./common";

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
        <LogoWrapper>
          <Heading>Running Aarhus</Heading>
          <RunningAarhusLogo source={require("../../assets/logo.png")} />
        </LogoWrapper>

        <FacebookButtonWrapper>
          <PushableWrapper onPress={this.signIn}>
            <FacebookLogo source={require("../../assets/facebook-logo.png")} />
          </PushableWrapper>
          <Heading>Facebook</Heading>

          <Divider />

          <StyledText>Please login with Facebook</StyledText>
          <StyledText>using the button above.</StyledText>
        </FacebookButtonWrapper>
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

const FacebookButtonWrapper = styled.View`
  flex: 0.65;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex: 0.35;
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.inactiveTint};
  border-bottom-width: 1px;
  margin-vertical: 20px;
  width: 80%;
`;

const Heading = styled.Text`
  font-weight: bold;
  margin-top: 40;
  font-size: 18;
  color: ${({ theme }) => theme.activeTint};
`;

const StyledText = styled.Text`
  color: white;
  margin-horizontal: 8px;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const RunningAarhusLogo = styled.Image`
  width: 180px;
  height: 180px;
`;

const FacebookLogo = styled.Image`
  width: 140px;
  height: 140px;
`;
