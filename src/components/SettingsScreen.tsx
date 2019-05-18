import { AsyncStorage, Linking } from "react-native";
import { SafeAreaView } from "react-navigation";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground, Section } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { styled, THEME_PREFIX } from "theme";
import firebase from "firebase";
// import * as StoreReview from "react-native-store-review";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class SettingsScreen extends React.Component<Props> {
  signOut = async () => {
    await AsyncStorage.clear();
    await firebase.auth().signOut();
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

              <Section top bottom touchable onPress={this.signOut}>
                <SectionTitle>{i18n.t("signOut")}</SectionTitle>
              </Section>
            </SectionsWrapper>

            <Credits>{i18n.t("credits")}</Credits>
          </ScrollWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

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

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
`;

const BottomMargin = styled.View`
  margin-bottom: 20px;
`;

const Credits = styled.Text`
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;
