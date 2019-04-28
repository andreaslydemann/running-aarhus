import React from "react";
import i18n from "i18n-js";
import {
  ScreenBackground,
  Header,
  TextInput,
  RunDetails,
  Section,
  SubmitButton,
  Subtitle
} from "components/common";
import { styled, theme, THEME_PREFIX } from "theme";
import { TouchableOpacity, Switch } from "react-native";
import DatePicker from "react-native-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "actions";
import { RunState } from "../types/states";
import { Action } from "../actions/common";

interface PropsConnectedState {
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
}

interface PropsConnectedDispatcher {
  setStartDateTime: (dateTime: string) => Action<string>;
  setTitle: (title: string) => Action<string>;
  setDescription: (description: string) => Action<string>;
  togglePace: () => Action<void>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: {
    goBack: (nullArg?: null) => void;
    navigate: (screen: string) => void;
  };
}

class CreateRunScreen extends React.Component<Props> {
  renderDatePicker() {
    return [
      <Subtitle titleText={"Date and time"} showInfoIcon={false} />,
      <DatePicker
        date={this.props.startDateTime}
        onDateChange={dateTime => this.props.setStartDateTime(dateTime)}
        is24Hour={true}
        mode="datetime"
        format="LLLL"
        minDate={new Date()}
        style={{ width: "95%" }}
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
    ];
  }

  renderAverageTempoToggle() {
    const hitSlopValue = 60;
    const touchableHitSlop = {
      top: hitSlopValue / 2,
      left: hitSlopValue,
      right: hitSlopValue,
      bottom: hitSlopValue / 2
    };

    return [
      <Subtitle
        titleText={"Average tempo"}
        showInfoIcon={true}
        dialogTitle={"Average tempo"}
        dialogText={
          "The average tempo is, in combination with the set route, used to estimate the time the run will be finished."
        }
      />,
      <Section top touchable onPress={() => this.props.togglePace()}>
        <SectionTitle>Use average tempo</SectionTitle>
        <Switch
          value={this.props.paceEnabled}
          onValueChange={() => this.props.togglePace()}
        />
      </Section>,
      <Section
        bottom
        disabled={!this.props.paceEnabled}
        touchable
        style={{ justifyContent: "space-around" }}
      >
        <TouchableOpacity
          disabled={false}
          onPress={() => console.log("pressed")}
          hitSlop={touchableHitSlop}
        >
          <Ionicons name={`${THEME_PREFIX}-remove`} size={18} color="#fff" />
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
    ];
  }

  render(): JSX.Element {
    const showRunDetails = true;

    return (
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("createRunTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <BottomMargin>{this.renderDatePicker()}</BottomMargin>

          <BottomMargin>
            <Subtitle titleText={"Title"} showInfoIcon={false} />
            <TextInput
              value={this.props.title}
              placeholder={"Intervals 2x5"}
              onChangeText={title => this.props.setTitle(title)}
            />
          </BottomMargin>

          <BottomMargin>
            <Subtitle titleText={"Description"} showInfoIcon={false} />
            <TextInput
              value={this.props.description}
              placeholder={"Provide some information about this run"}
              onChangeText={description =>
                this.props.setDescription(description)
              }
              isTextArea={true}
            />
          </BottomMargin>

          <BottomMargin>{this.renderAverageTempoToggle()}</BottomMargin>

          <Subtitle titleText={"Route"} showInfoIcon={false} />
          <Section
            top
            bottom={!showRunDetails}
            touchable
            onPress={() => this.props.navigation.navigate("MapScreen")}
          >
            <SectionTitle>Set route</SectionTitle>
          </Section>
          {showRunDetails && (
            <Section bottom>
              <RunDetails meetingLocation={"Aarhus C"} distanceInKm={7.2} />
            </Section>
          )}
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

const mapStateToProps = ({ run }: { run: RunState }): PropsConnectedState => {
  return {
    startDateTime: run.startDateTime,
    title: run.title,
    description: run.description,
    paceEnabled: run.paceEnabled
  };
};

export default connect(
  mapStateToProps,
  actions
)(CreateRunScreen as React.ComponentClass<Props>);

const BottomMargin = styled.View`
  margin-bottom: 40px;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
`;
