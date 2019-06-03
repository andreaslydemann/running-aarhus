import { AsyncStorage, Linking, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground, Section } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { theme, styled, THEME_PREFIX } from "theme";
import firebase from "firebase";
import Dialog, {
  DialogButton,
  DialogContent,
  DialogFooter,
  DialogTitle,
  ScaleAnimation
} from "react-native-popup-dialog";
import { connect } from "react-redux";
import * as actions from "actions";
// import * as StoreReview from "react-native-store-review";

interface State {
  dialogVisible: boolean;
}

interface Props {
  navigation: { navigate: (screen: string) => void };
  deleteUser: () => void;
}

class SettingsScreen extends React.Component<Props, State> {
  state = {
    dialogVisible: false
  };

  signOut = async () => {
    await AsyncStorage.clear();
    await firebase.auth().signOut();
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
        dialogTitle={<DialogTitle title={"Confirm"} hasTitleBar={false} />}
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
          <Text>Are you sure you want to delete your user?</Text>
        </DialogContent>
      </Dialog>
    );
  };

  render(): JSX.Element {
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title={i18n.t("settingsTitle")} />
          <ScrollWrapper>
            <SectionsWrapper>
              <BottomMargin>
                <Section
                  top
                  touchable
                  onPress={() =>
                    Linking.openURL("https://twitter.com/andreaslydemann")
                  }
                >
                  <SectionTitle>Say hi 👋</SectionTitle>
                  <Ionicons name="logo-twitter" size={22} color="#fff" />
                </Section>
                <Section
                  bottom
                  touchable
                  onPress={() => {
                    console.log("open link");
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
                  <SectionTitle>Give your feedback</SectionTitle>
                  <Ionicons
                    name={`${THEME_PREFIX}-appstore`}
                    size={22}
                    color="#fff"
                  />
                </Section>
              </BottomMargin>

              <Section
                top
                touchable
                onPress={() => this.setState({ dialogVisible: true })}
              >
                <SectionTitle danger>{i18n.t("deleteUser")}</SectionTitle>
              </Section>
              <Section bottom touchable onPress={this.signOut}>
                <SectionTitle>{i18n.t("signOut")}</SectionTitle>
              </Section>
            </SectionsWrapper>

            <Credits>{i18n.t("credits")}</Credits>
          </ScrollWrapper>
        </ContentWrapper>

        {this.renderDialog()}
      </Wrapper>
    );
  }
}

export default connect(
  null,
  actions
)(SettingsScreen as React.ComponentClass<Props>);

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
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
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;
