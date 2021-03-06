import * as actions from "actions";
import { AuthState } from "types/states";
import { Action } from "types/common";
import React from "react";
import { connect } from "react-redux";
import { styled, theme } from "theme";
import {
  ScreenBackground,
  PushableWrapper,
  LetterSpacedText,
  Text
} from "./common";
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
      <ScreenBackground>
        <LogoWrapper>
          <Logo source={require("../../assets/runner.png")} />

          <TitleWrapper>
            <LetterSpacedText
              spacing={14}
              viewStyle={titleViewStyle}
              textStyle={titleTextStyle}
            >
              {i18n.t("appTitlePart1").toUpperCase()}
            </LetterSpacedText>
            <LetterSpacedText spacing={20} textStyle={subtitleTextStyle}>
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
      </ScreenBackground>
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
  marginTop: 20,
  marginBottom: 4
};

const titleTextStyle = {
  color: theme.activeTint,
  fontWeight: "bold",
  fontSize: 26
};

const subtitleTextStyle = {
  color: theme.activeTint,
  fontSize: 26
};

const FacebookButtonWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.View`
  justify-content: flex-end;
  align-self: center;
  flex: 1;
`;

const TitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.inactiveTint};
  border-bottom-width: 1px;
  margin-vertical: 20px;
  width: 300px;
`;

const LoginText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.activeTint};
  margin-horizontal: 8px;
  width: 60%;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

const FacebookButton = styled.Image`
  width: 300px;
  height: 60px;
  border-radius: 5px;
`;
