import * as actions from "actions";
import { AuthState } from "types/states";
import { Action } from "types/common";
import React from "react";
import { connect } from "react-redux";
import { styled, theme } from "theme";
import { ScreenBackground, PushableWrapper, LetterSpacedText } from "./common";
import i18n from "i18n-js";

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
          <RunningAarhusLogo source={require("../../assets/runner.png")} />

          <TitleWrapper>
            <LetterSpacedText
              spacing={15}
              viewStyle={titleViewStyle}
              textStyle={titleTextStyle}
            >
              {i18n.t("appTitlePart1").toUpperCase()}
            </LetterSpacedText>
            <LetterSpacedText spacing={25} textStyle={subtitleTextStyle}>
              {i18n.t("appTitlePart2").toUpperCase()}
            </LetterSpacedText>
          </TitleWrapper>
        </LogoWrapper>

        <FacebookButtonWrapper>
          <PushableWrapper onPress={this.signIn}>
            <FacebookButton
              source={require("../../assets/facebook-button.png")}
            />
          </PushableWrapper>

          <Divider />

          <LoginText>{i18n.t("loginWithFacebook")}</LoginText>
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

const titleViewStyle = {
  marginTop: 20
};

const titleTextStyle = {
  color: theme.activeTint,
  fontWeight: "bold",
  fontSize: 26
};

const subtitleTextStyle = {
  color: theme.activeTint,
  fontSize: 20
};

const FacebookButtonWrapper = styled.View`
  flex: 0.55;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.View`
  justify-content: flex-end;
  align-self: center;
  flex: 0.45;
`;

const TitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.inactiveTint};
  border-bottom-width: 1px;
  margin-vertical: 20px;
  width: 80%;
`;

const Title = styled.Text`
  letter-spacing: 30;
  font-weight: bold;
  margin-top: 20;
  font-size: 28;
  color: ${({ theme }) => theme.activeTint};
`;

const Subtitle = styled.Text`
  align-items: center;
  letter-spacing: 30;
  font-size: 20;
  color: ${({ theme }) => theme.activeTint};
`;

const LoginText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.activeTint};
  margin-horizontal: 8px;
  width: 60%;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const RunningAarhusLogo = styled.Image`
  width: 207px;
  height: 180px;
`;

const FacebookButton = styled.Image`
  width: 300px;
  height: 60px;
  border-radius: 5px;
`;
