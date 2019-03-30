import { AsyncStorage, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components";
import { styled } from "theme";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class SettingsScreen extends React.Component<Props> {
  signOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render(): JSX.Element {
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title={i18n.t("settingsTitle")} />
          <SectionsWrapper>
            <Section>
              <TouchableOpacity onPress={this.signOut}>
                <Text>{i18n.t("signOut")}</Text>
              </TouchableOpacity>
            </Section>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ContentWrapper = styled(SafeAreaView)`
  padding-top: 30px;
  flex: 1;
`;

const SectionsWrapper = styled.ScrollView`
  padding: 0 25px;
  margin-top: 30px;
`;

const Section = styled.TouchableOpacity`
  background: ${({ theme }) => theme.primary};
  padding: 22px;
  height: 70px;
  ${(props: any) =>
    props.top &&
    `
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    `} ${(props: any) =>
    props.bottom &&
    `
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-bottom: 22px;
    `} margin-top: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${(props: any) => props.disabled && `opacity: 0.3;`};
`;

const SectionTitle = styled.Text`
  color: white;
`;

const Credits = styled.Text`
  color: #aaa;
  text-align: center;
  margin-bottom: 22px;
`;
