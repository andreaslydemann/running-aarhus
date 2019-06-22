import { Linking, Text } from "react-native";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground, Section } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { theme, styled, THEME_PREFIX } from "theme";
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  ScaleAnimation
} from "react-native-popup-dialog";
import { connect } from "react-redux";
import * as actions from "actions";
import { AuthState } from "types/states";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
// import * as StoreReview from "react-native-store-review";

interface PropsConnectedState {
  loading: boolean;
  error: boolean;
}

interface State {
  dialogVisible: boolean;
}

interface Props extends PropsConnectedState {
  navigation: { navigate: (screen: string) => void };
  deleteUser: () => void;
  signOut: () => void;
}

class SettingsScreen extends React.Component<Props, State> {
  state = {
    dialogVisible: false
  };

  renderDialog = () => {
    return (
      <Dialog
        onTouchOutside={() => {
          this.setState({ dialogVisible: false });
        }}
        width={0.89}
        visible={this.state.dialogVisible}
        dialogAnimation={new ScaleAnimation()}
        dialogTitle={
          <DialogTitle
            title={i18n.t("deleteUserDialogTitle")}
            hasTitleBar={false}
          />
        }
        footer={
          <DialogFooter>
            <DialogButton
              text={i18n.t("optionNo")}
              onPress={() => {
                this.setState({
                  dialogVisible: false
                });
              }}
            />
            <DialogButton
              text={i18n.t("optionYes")}
              onPress={() => {
                this.setState(
                  {
                    dialogVisible: false
                  },
                  () => {
                    setTimeout(() => {
                      this.props.deleteUser();
                    }, 1000);
                  }
                );
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ alignItems: "center" }}>
          <Text>{i18n.t("deleteUserDialogDescription")}</Text>
        </DialogContent>
      </Dialog>
    );
  };

  render(): JSX.Element {
    const { loading, error } = this.props;

    return (
      <ScreenBackground>
        <ScreenTitle title={i18n.t("settingsTitle")} />
        <ScrollWrapper>
          <SectionsWrapper>
            <BottomMargin>
              <Section
                topPart
                touchable
                onPress={() =>
                  Linking.openURL("https://twitter.com/andreaslydemann")
                }
              >
                <SectionTitle>{i18n.t("twitterLinking")}</SectionTitle>
                <Ionicons name="logo-twitter" size={22} color="#fff" />
              </Section>
              <Section
                bottomPart
                touchable
                onPress={() => {
                  /*if (StoreReview.isAvailable) {
                    StoreReview.requestReview();
                  } else {
                    Linking.openURL(
                      "https://itunes.apple.com/us/app/appid
                    );
                  }
                }}*/
                }}
              >
                <SectionTitle>{i18n.t("giveFeedback")}</SectionTitle>
                <Ionicons
                  name={`${THEME_PREFIX}-appstore`}
                  size={22}
                  color="#fff"
                />
              </Section>
            </BottomMargin>

            <Section
              topPart
              touchable
              onPress={() => this.setState({ dialogVisible: true })}
            >
              <SectionTitle danger>{i18n.t("deleteUser")}</SectionTitle>
            </Section>
            <Section bottomPart touchable onPress={() => this.props.signOut()}>
              <SectionTitle>{i18n.t("signOut")}</SectionTitle>
            </Section>
          </SectionsWrapper>

          <Credits>{i18n.t("credits")}</Credits>
        </ScrollWrapper>

        {this.renderDialog()}

        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading}
          showAsOverlay={true}
        />

        <StatusModal
          type={statusModalTypes.ERROR}
          isVisible={error}
          height={135}
          width={115}
          textNumberOfLines={2}
          text={i18n.t("errorOccurred")}
        />
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
    loading: auth.loading,
    error: auth.error
  };
};

export default connect(
  mapStateToProps,
  actions
)(SettingsScreen as React.ComponentClass<Props>);

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const SectionsWrapper = styled.View`
  margin: 20px 0;
`;

interface SectionTitleProps {
  danger?: boolean;
}

const SectionTitle = styled.Text<SectionTitleProps>`
  color: ${({ danger }) => (danger ? theme.danger : theme.activeTint)};
  font-weight: ${({ danger }) => (danger ? "bold" : "normal")};
`;

const BottomMargin = styled.View`
  margin-bottom: 20px;
`;

const Credits = styled.Text`
  color: ${({ theme }) => theme.inactiveTint};
  text-align: center;
  margin-bottom: 22px;
`;
