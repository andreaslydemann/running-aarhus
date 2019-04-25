import React from "react";
import i18n from "i18n-js";
import {
  ScreenBackground,
  Header,
  TextInput,
  RunDetailsCard,
  Section,
  SubmitButton,
  Subtitle
} from "components/common";
import { styled, theme, THEME_PREFIX } from "theme";
import { TouchableOpacity, Switch } from "react-native";
import DatePicker from "react-native-datepicker";
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
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("createRunTitle")}
          isModal={true}
        />
        <ScrollWrapper contentContainerStyle={{ paddingVertical: 20 }}>
          <Subtitle titleText={"Date and time"} showInfoIcon={false} />
          <DatePicker
            date={new Date()}
            onDateChange={() => {
              console.log("hello");
            }}
            is24Hour={true}
            mode="datetime"
            format="DD-MM-YYYY"
            minDate={new Date()}
            style={{ width: "95%", marginBottom: 20 }}
            cancelBtnText={"Cancel"}
            confirmBtnText={"Ok"}
            iconComponent={
              <Ionicons
                size={22}
                color={"#fff"}
                name={`${THEME_PREFIX}-calendar`}
              />
            }
            customStyles={{
              dateInput: {
                backgroundColor: theme.primary,
                borderRadius: 6,
                borderWidth: 0,
                marginRight: 10
              },
              dateText: {
                color: theme.activeTint
              }
            }}
          />
          <Subtitle titleText={"Title"} showInfoIcon={false} />
          <TextInput
            value={""}
            placeholder={"Intervals 2x5"}
            onChangeText={(text: string) => console.log(text)}
          />

          <Subtitle titleText={"Description"} showInfoIcon={false} />
          <TextInput
            value={""}
            placeholder={"Provide some information about this run"}
            onChangeText={(text: string) => console.log(text)}
            isTextArea={true}
          />

          <Subtitle
            titleText={"Average tempo"}
            showInfoIcon={true}
            dialogTitle={"Average tempo"}
            dialogText={
              "The average tempo is, in combination with the set route, used to estimate the time the run will be finished."
            }
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
                name={`${THEME_PREFIX}-remove`}
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
                name={`${THEME_PREFIX}-add`}
                size={18}
                color={theme.activeTint}
              />
            </TouchableOpacity>
          </Section>

          <Subtitle titleText={"Route"} showInfoIcon={false} />
          <Section
            top
            bottom
            onPress={() => this.props.navigation.navigate("MapScreen")}
          >
            <SectionTitle>Set route</SectionTitle>
          </Section>

          <Subtitle titleText={"Details"} showInfoIcon={false} />
          <RunDetailsCard meetingLocation={"Aarhus C"} distanceInKm={7.2} />
        </ScrollWrapper>

        <SubmitButton
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

const ScrollWrapper = styled.ScrollView`
  padding: 0 25px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
`;
