import { AsyncStorage } from "react-native";
import { SafeAreaView } from "react-navigation";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components/common";
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
          <SectionsWrapper>
            <Section top bottom onPress={this.signOut}>
              <SectionTitle>{i18n.t("signOut")}</SectionTitle>
            </Section>
            <Credits>{i18n.t("credits")}</Credits>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

interface ButtonProps {
  top?: boolean;
  bottom?: boolean;
  disabled?: boolean;
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ContentWrapper = styled(SafeAreaView)`
  padding-top: 30px 0;
  flex: 1;
`;

const SectionsWrapper = styled.ScrollView`
  padding: 0 25px;
  margin-top: 30px;
`;

const Section = styled.TouchableOpacity<ButtonProps>`
  background: ${({ theme }) => theme.primary};
  padding: 22px;
  height: 70px;
  ${props =>
    props.top &&
    `
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    `} ${props =>
    props.bottom &&
    `
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-bottom: 22px;
    `} margin-top: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${props => props.disabled && `opacity: 0.3;`};
`;

const SectionTitle = styled.Text`
  color: white;
`;

const Credits = styled.Text`
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;