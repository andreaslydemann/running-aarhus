import React from "react";
import i18n from "i18n-js";
import {
  ScreenBackground,
  Header,
  TextInput,
  RouteSummary,
  Section,
  SubmitButton,
  Subtitle
} from "components/common";
import { styled, theme, THEME_PREFIX } from "theme";
import { Switch } from "react-native";
import DatePicker from "react-native-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "actions";
import { Action } from "actions/common";
import { RunState } from "types/states";
import { Coordinate, RouteDetails } from "types/common";

interface PropsConnectedState {
  startDateTime: string;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number;
  routeDetails: RouteDetails | null;
}

interface PropsConnectedDispatcher {
  setStartDateTime: (dateTime: string) => Action<string>;
  setTitle: (title: string) => Action<string>;
  setDescription: (description: string) => Action<string>;
  togglePace: () => Action<void>;
  increasePace: () => Action<void>;
  decreasePace: () => Action<void>;
  setRoute: (routeDetails: RouteDetails) => Action<any>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: {
    goBack: (nullArg?: null) => void;
    navigate: (screen: string, params?: any) => void;
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

  renderPaceSwitch() {
    const hitSlopValue = 60;
    const touchableHitSlop = {
      top: hitSlopValue / 2,
      left: hitSlopValue,
      right: hitSlopValue,
      bottom: hitSlopValue / 2
    };

    return [
      <Subtitle
        titleText={"Pace"}
        showInfoIcon={true}
        dialogTitle={"Pace"}
        dialogText={
          "The pace is the average tempo which, in combination with the set route, is used to estimate the time that the run will be finished."
        }
      />,
      <Section top touchable={false}>
        <SectionTitle>Use average tempo</SectionTitle>
        <Switch
          value={this.props.paceEnabled}
          onValueChange={() => this.props.togglePace()}
        />
      </Section>,
      <Section
        bottom
        disabled={!this.props.paceEnabled}
        touchable={false}
        style={{ justifyContent: "space-around" }}
      >
        <PaceButtonWrapper
          disabled={false}
          onPress={() => this.props.decreasePace()}
          hitSlop={touchableHitSlop}
        >
          <Ionicons name={`${THEME_PREFIX}-remove`} size={18} color="#fff" />
        </PaceButtonWrapper>
        <PaceTextWrapper>
          <SectionTitle>{this.props.pace} min/km</SectionTitle>
        </PaceTextWrapper>
        <PaceButtonWrapper
          disabled={false}
          onPress={() => this.props.increasePace()}
          hitSlop={touchableHitSlop}
        >
          <Ionicons
            name={`${THEME_PREFIX}-add`}
            size={18}
            color={theme.activeTint}
          />
        </PaceButtonWrapper>
      </Section>
    ];
  }

  render(): JSX.Element {
    let { routeDetails, pace, paceEnabled, title, description } = this.props;
    let meetingPoint: string = "";
    let coordinates: Coordinate[] = [];

    if (routeDetails) {
      meetingPoint = routeDetails.meetingPoint;
      coordinates = routeDetails.coordinates;
    }

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
              value={title}
              placeholder={"Intervals 2x5"}
              onChangeText={title => this.props.setTitle(title)}
            />
          </BottomMargin>

          <BottomMargin>
            <Subtitle titleText={"Description"} showInfoIcon={false} />
            <TextInput
              value={description}
              placeholder={"Provide some information about this run"}
              onChangeText={description =>
                this.props.setDescription(description)
              }
              isTextArea={true}
            />
          </BottomMargin>

          <BottomMargin>{this.renderPaceSwitch()}</BottomMargin>

          <Subtitle titleText={"Route"} showInfoIcon={false} />
          <Section
            top
            bottom={!routeDetails}
            touchable
            onPress={() =>
              this.props.navigation.navigate("MapScreen", {
                meetingPoint,
                coordinates,
                pace: paceEnabled ? pace : null,
                onConfirmRoute: (routeDetails: RouteDetails) =>
                  this.props.setRoute(routeDetails)
              })
            }
          >
            <SectionTitle>Set route</SectionTitle>
          </Section>
          {routeDetails && (
            <Section bottom>
              <RouteSummary routeDetails={routeDetails} />
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
    paceEnabled: run.paceEnabled,
    pace: run.pace,
    routeDetails: run.routeDetails
  };
};

export default connect(
  mapStateToProps,
  actions
)(CreateRunScreen as React.ComponentClass<Props>);

const PaceTextWrapper = styled.View`
  width: 50%;
  align-items: center;
`;

const PaceButtonWrapper = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
`;

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
