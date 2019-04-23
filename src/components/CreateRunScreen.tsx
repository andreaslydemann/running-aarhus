import React from "react";
import i18n from "i18n-js";
import {
  ScreenBackground,
  HeaderBack,
  TextInput,
  RunDetailsCard,
  Section,
  BottomButton
} from "components/common";
import { styled } from "theme";
import { TouchableOpacity, Switch, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: {
    goBack: (nullArg?: null) => void;
    navigate: (screen: string) => void;
  };
}

export default class CreateRunScreen extends React.Component<Props> {
  render(): JSX.Element {
    const hitSlopValue = 60;
    const touchableHitSlop = {
      top: hitSlopValue / 2,
      left: hitSlopValue,
      right: hitSlopValue,
      bottom: hitSlopValue / 2
    };

    return (
      <Wrapper>
        <HeaderBack
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("createRunTitle")}
          isModal={true}
        />
        <ScrollWrapper contentContainerStyle={{ paddingBottom: 20 }}>
          <TextInput
            value={""}
            placeholder={"Intervals 2x5"}
            onChangeText={(text: string) => console.log(text)}
          />
          <TextInput
            value={""}
            placeholder={"Provide some information about this run"}
            onChangeText={(text: string) => console.log(text)}
            isTextArea={true}
          />

          <Section top>
            <SectionTitle>Use average tempo</SectionTitle>
            <Switch
              value={false}
              onValueChange={() => console.log("switched")}
            />
          </Section>
          <Section
            bottom
            disabled={true}
            style={{ justifyContent: "space-around" }}
          >
            <TouchableOpacity
              disabled={false}
              onPress={() => console.log("pressed")}
              hitSlop={touchableHitSlop}
            >
              <Ionicons
                name={Platform.OS === "ios" ? "ios-remove" : "md-remove"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
            <SectionTitle>4.05 min/km</SectionTitle>
            <TouchableOpacity
              disabled={false}
              onPress={() => console.log("pressed")}
              hitSlop={touchableHitSlop}
            >
              <Ionicons
                name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </Section>

          <Section
            top
            bottom
            onPress={() => this.props.navigation.navigate("MapScreen")}
          >
            <SectionTitle>Set route</SectionTitle>
          </Section>

          <SectionHeader>Details</SectionHeader>
          <RunDetailsCard meetingLocation={"Aarhus C"} distanceInKm={7.2} />
        </ScrollWrapper>

        <BottomButton
          onPress={() => {
            console.log("clicked");
          }}
          title={"Gem"}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const SectionHeader = styled.Text`
  color: #eee;
  font-size: 16px;
  font-weight: bold;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 0 25px;
`;

const SectionTitle = styled.Text`
  color: white;
`;
