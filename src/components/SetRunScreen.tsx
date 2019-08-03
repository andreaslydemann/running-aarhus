import React from "react";
import i18n from "i18n-js";
import {
  ScreenBackground,
  Header,
  TextInput,
  RouteSummary,
  Section,
  SubmitButton,
  Subtitle,
  Text
} from "components/common";
import { styled, theme, THEME_PREFIX } from "theme";
import { Switch } from "react-native";
import DatePicker from "react-native-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "actions";
import { RunState } from "types/states";
import { Coordinate, RouteDetails, Action } from "types/common";
import { statusModalTypes, StatusModal } from "./common/StatusModal";
import { getLanguage } from "utils";
import moment from "moment";
import "moment/min/locales";

interface PropsConnectedState {
  id: string;
  startDateTime: Date;
  title: string;
  description: string;
  paceEnabled: boolean;
  pace: number | null;
  routeDetails: RouteDetails | null;
  loading: boolean;
  error: boolean;
  startDateTimeError: boolean;
}

interface PropsConnectedDispatcher {
  setStartDateTime: (dateTime: Date) => Action<Date>;
  setTitle: (title: string) => Action<string>;
  setDescription: (description: string) => Action<string>;
  togglePace: () => Action<void>;
  increasePace: () => Action<void>;
  decreasePace: () => Action<void>;
  setRoute: (routeDetails: RouteDetails) => Action<any>;
  saveRun: (run: any, runType: string) => Action<any>;
  resetRun: () => Action<void>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: {
    getParam: (param: string) => any;
    goBack: (nullArg?: null) => void;
    navigate: (screen: string, params?: any) => void;
  };
}

class SetRunScreen extends React.Component<Props> {
  renderDatePicker() {
    const language = getLanguage();
    return [
      <Subtitle
        titleText={i18n.t("dateAndTime")}
        showInfoIcon={false}
        key={"subtitle"}
      />,
      <DatePicker
        key={"datepicker"}
        locale={language}
        date={this.props.startDateTime}
        onDateChange={() => {}}
        getDateStr={date => {
          if (this.props.startDateTime !== date) {
            this.props.setStartDateTime(date);
          }

          return moment(date)
            .locale(language)
            .format("LLLL");
        }}
        is24Hour={true}
        mode="datetime"
        format="LLLL"
        minDate={new Date()}
        style={{ width: "95%" }}
        cancelBtnText={i18n.t("datePickerCancel")}
        confirmBtnText={i18n.t("datePickerOk")}
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
          },
          btnTextConfirm: {
            color: theme.action,
            fontWeight: "bold"
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
        key={"subtitle"}
        titleText={"Pace"}
        showInfoIcon={true}
        dialogTitle={"Pace"}
        dialogText={i18n.t("paceDescription")}
      />,
      <Section topPart touchable={false} key={"section1"}>
        <SectionTitle>{i18n.t("enablePace")}</SectionTitle>
        <Switch
          value={this.props.paceEnabled}
          onValueChange={() => this.props.togglePace()}
        />
      </Section>,
      <Section
        bottomPart
        disabled={!this.props.paceEnabled}
        touchable={false}
        style={{ justifyContent: "space-around" }}
        key={"section2"}
      >
        <PaceButtonWrapper
          disabled={!this.props.paceEnabled}
          onPress={() => this.props.decreasePace()}
          hitSlop={touchableHitSlop}
        >
          <Ionicons name={`${THEME_PREFIX}-remove`} size={18} color="#fff" />
        </PaceButtonWrapper>
        <PaceTextWrapper>
          <SectionTitle>
            {this.props.pace} {i18n.t("paceUnit")}
          </SectionTitle>
        </PaceTextWrapper>
        <PaceButtonWrapper
          disabled={!this.props.paceEnabled}
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

  saveRun = () => {
    const {
      title,
      description,
      pace,
      paceEnabled,
      startDateTime,
      routeDetails,
      id
    } = this.props;

    const runType = this.props.navigation.getParam("runType");

    this.props.saveRun(
      {
        id,
        title,
        description,
        pace: paceEnabled ? pace : null,
        startDateTime,
        ...routeDetails
      },
      runType
    );
  };

  navigateBack = () => {
    this.props.resetRun();
    this.props.navigation.goBack(null);
  };

  render(): JSX.Element {
    let {
      id,
      routeDetails,
      pace,
      paceEnabled,
      title,
      description,
      startDateTime,
      startDateTimeError,
      loading,
      error
    } = this.props;
    let meetingPoint: string = "";
    let coordinates: Coordinate[] = [];

    if (routeDetails) {
      meetingPoint = routeDetails.meetingPoint;
      coordinates = routeDetails.coordinates || [];
    }

    return (
      <ScreenBackground>
        <Header
          navigateBack={this.navigateBack}
          ScreenTitle={!!id ? i18n.t("editRunTitle") : i18n.t("createRunTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 20 }}>
          <BottomMargin>
            {this.renderDatePicker()}
            {startDateTimeError && (
              <ErrorText>{i18n.t("startDateTimeInvalid")}</ErrorText>
            )}
          </BottomMargin>

          <BottomMargin>
            <Subtitle titleText={i18n.t("title")} showInfoIcon={false} />
            <TextInput
              value={title}
              placeholder={i18n.t("titlePlaceholder")}
              onChangeText={title => this.props.setTitle(title)}
            />
          </BottomMargin>

          <BottomMargin>
            <Subtitle titleText={i18n.t("description")} showInfoIcon={false} />
            <TextInput
              value={description}
              placeholder={i18n.t("descriptionPlaceholder")}
              onChangeText={description =>
                this.props.setDescription(description)
              }
              isTextArea={true}
            />
          </BottomMargin>

          <BottomMargin>{this.renderPaceSwitch()}</BottomMargin>

          <Subtitle titleText={i18n.t("showRouteTitle")} showInfoIcon={false} />
          <Section
            topPart
            bottomPart={!routeDetails}
            touchable
            onPress={() =>
              this.props.navigation.navigate("SetRouteScreen", {
                startDateTime,
                meetingPoint,
                coordinates,
                pace: paceEnabled ? pace : null,
                onConfirmRoute: (routeDetails: RouteDetails) =>
                  this.props.setRoute(routeDetails)
              })
            }
          >
            <SectionTitle>{i18n.t("setRouteTitle")}</SectionTitle>
          </Section>
          {routeDetails && (
            <Section bottomPart>
              <RouteSummary
                routeDetails={routeDetails}
                showEndDateTime={paceEnabled}
              />
            </Section>
          )}
        </ScrollWrapper>

        <SubmitButton
          disabled={!(routeDetails && title) || loading || startDateTimeError}
          onPress={this.saveRun}
          title={i18n.t("save")}
        />

        <LoadingModal
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

const mapStateToProps = ({ run }: { run: RunState }): PropsConnectedState => {
  return {
    id: run.id,
    startDateTime: run.startDateTime,
    title: run.title,
    description: run.description,
    paceEnabled: run.paceEnabled,
    pace: run.pace,
    routeDetails: run.routeDetails,
    loading: run.loading,
    error: run.error,
    startDateTimeError: run.startDateTimeError
  };
};

export default connect(
  mapStateToProps,
  actions
)(SetRunScreen as React.ComponentClass<Props>);

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

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const SectionTitle = styled(Text)`
  color: ${({ theme }) => theme.activeTint};
`;

const LoadingModal = styled(StatusModal)`
  margin-bottom: 80px;
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.danger};
  font-weight: bold;
  font-size: 14px;
  padding-top: 3px;
  padding-left: 10px;
`;
