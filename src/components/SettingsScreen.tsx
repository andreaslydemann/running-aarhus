import { AsyncStorage } from "react-native";
import { SafeAreaView } from "react-navigation";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground, Section } from "components/common";
import { styled } from "theme";
import firebase from "firebase";

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

const Credits = styled.Text`
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;
