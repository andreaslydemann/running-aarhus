import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import {
  Header,
  Button,
  ScreenBackground,
  ProfileInfo
} from "components/common";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  ScaleAnimation
} from "react-native-popup-dialog";
import { Ionicons } from "@expo/vector-icons";
import { DetailsState, RootState } from "types/states";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { connect } from "react-redux";
import * as actions from "../actions";
import i18n from "i18n-js";
import moment from "moment";
import { getLanguage, getCurrentUser } from "utils";
import { RunModel } from "types/models";
import { Text } from "react-native";
import { StatusModal, statusModalTypes } from "./common/StatusModal";

interface State {
  dialogVisible: boolean;
}

interface PropsConnectedDispatcher {
  saveParticipation: (run: RunModel, runType: string) => void;
  cancelParticipation: (run: RunModel, runType: string) => void;
  cancelRun: (runId: string, runType: string) => void;
  setRun: (run: RunModel) => void;
}

interface Props extends DetailsState, PropsConnectedDispatcher {
  showActionSheetWithOptions: (options: any, callback: any) => void;
  navigation: {
    navigate: (screen: string, params?: any) => void;
    getParam: (param: string) => any;
    goBack: (nullArg?: null) => void;
  };
}

class RunDetailsScreen extends Component<Props, State> {
  state = {
    dialogVisible: false
  };

  openActionSheet = () => {
    const runType = this.props.navigation.getParam("runType");

    const options = [
      i18n.t("optionEditRun"),
      i18n.t("optionCancelRun"),
      i18n.t("optionDismiss")
    ];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        tintColor: theme.action
      },
      (buttonIndex: number) => {
        switch (buttonIndex) {
          case 0:
            this.props.setRun(this.props.run);
            this.props.navigation.navigate("SetRunScreen", { runType });
            break;
          case 1:
            this.setState({ dialogVisible: true });
            break;
          default:
            break;
        }
      }
    );
  };

  renderDialog = () => {
    const { cancelRun, run, navigation } = this.props;
    const runType = navigation.getParam("runType");

    return (
      <Dialog
        onTouchOutside={() => {
          this.setState({ dialogVisible: false });
        }}
        width={0.89}
        visible={this.state.dialogVisible}
        dialogAnimation={new ScaleAnimation()}
        dialogTitle={
          <DialogTitle
            title={i18n.t("cancelRunDialogTitle")}
            hasTitleBar={false}
          />
        }
        footer={
          <DialogFooter>
            <DialogButton
              text={i18n.t("optionNo")}
              onPress={() => {
                this.setState({ dialogVisible: false });
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
                    cancelRun(run.id, runType);
                  }
                );
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ alignItems: "center" }}>
          <Text>{i18n.t("cancelRunDialogDescription")}</Text>
        </DialogContent>
      </Dialog>
    );
  };

  render() {
    const {
      error,
      success,
      participationLoading,
      cancellationLoading,
      run,
      navigation
    } = this.props;

    const isPastRun = navigation.getParam("isPastRun");
    const runType = navigation.getParam("runType");

    const {
      startDateTime,
      title,
      description,
      pace,
      participating,
      participants,
      createdBy,
      cancelled
    } = run;

    const routeDetails = {
      meetingPoint: run.meetingPoint,
      distance: run.distance,
      coordinates: run.coordinates,
      endDateTime: run.endDateTime
    };

    const startDate = moment(new Date(startDateTime))
      .locale(getLanguage())
      .format("LLL");
    const endTime = run.endDateTime
      ? moment(new Date(run.endDateTime))
          .locale(getLanguage())
          .format("LT")
      : null;

    const isOwnRun = createdBy && createdBy.id === getCurrentUser().uid;
    const showMoreButton = isOwnRun && !(cancelled || isPastRun);

    return (
      <ScreenBackground>
        <Header
          ScreenTitle={(cancelled ? i18n.t("cancelled") + ": " : "") + title}
          navigateBack={() => navigation.goBack(null)}
          showMoreButton={showMoreButton}
          onMoreButtonPress={this.openActionSheet}
        />
        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <DetailsWrapper>
            <BottomMargin>
              <SectionTitle>{i18n.t("dateAndTime")}</SectionTitle>
              <InfoText>
                {startDate}
                {endTime ? " - " + endTime : null}
              </InfoText>
            </BottomMargin>
            <BottomMargin>
              <SectionTitle>{i18n.t("distance")}</SectionTitle>
              <InfoText>
                {routeDetails.distance} {i18n.t("distanceUnit")}
              </InfoText>
            </BottomMargin>
            {pace !== null && (
              <BottomMargin>
                <SectionTitle>{i18n.t("pace")}</SectionTitle>
                <InfoText>
                  {pace} {i18n.t("paceUnit")}
                </InfoText>
              </BottomMargin>
            )}
            <SectionTitle>{i18n.t("meetingPoint")}</SectionTitle>
            <InfoText>{routeDetails.meetingPoint}</InfoText>
          </DetailsWrapper>

          <Icon
            name={`${THEME_PREFIX}-walk`}
            size={40}
            color={theme.activeTint}
          />

          {description ? <DescText>{description}</DescText> : null}

          {createdBy && (
            <ProfileWrapper>
              <ProfileInfo user={createdBy} />
            </ProfileWrapper>
          )}

          <Row>
            <ButtonWrapper>
              <StyledButton
                icon={`${THEME_PREFIX}-people`}
                onPress={() =>
                  navigation.navigate("ParticipantsScreen", {
                    participants
                  })
                }
              />
              <ButtonLabel>{i18n.t("participants")}</ButtonLabel>
            </ButtonWrapper>
            <ButtonWrapper>
              <StyledButton
                disabled={!routeDetails}
                icon={`${THEME_PREFIX}-map`}
                onPress={() => {
                  navigation.navigate("ShowRouteScreen", {
                    coordinates: routeDetails.coordinates
                  });
                }}
              />
              <ButtonLabel>{i18n.t("route")}</ButtonLabel>
            </ButtonWrapper>
          </Row>

          {!(isPastRun || cancelled) && (
            <ButtonWrapper>
              {participationLoading ? (
                <Spinner color={theme.activeTint} size="large" />
              ) : participating ? (
                <StyledButton
                  type={"destructive"}
                  title={i18n.t("cancel")}
                  onPress={() =>
                    this.props.cancelParticipation(this.props.run, runType)
                  }
                />
              ) : (
                <StyledButton
                  type={"submit"}
                  title={i18n.t("join")}
                  onPress={() =>
                    this.props.saveParticipation(this.props.run, runType)
                  }
                />
              )}
            </ButtonWrapper>
          )}
        </ScrollWrapper>

        <StatusModal type={statusModalTypes.SUCCESS} isVisible={success} />

        <StatusModal
          type={statusModalTypes.ERROR}
          isVisible={error}
          height={135}
          width={115}
          textNumberOfLines={2}
          text={i18n.t("errorOccurred")}
        />
        {cancellationLoading && (
          <StatusModal
            type={statusModalTypes.LOADING}
            isVisible={cancellationLoading}
          />
        )}

        {this.renderDialog()}
      </ScreenBackground>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: Props) => {
  const reducer = ownProps.navigation.getParam("reducer");

  return state[reducer];
};

export default connectActionSheet(
  connect(
    mapStateToProps,
    actions
  )(RunDetailsScreen as React.ComponentClass<Props>)
);

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const DetailsWrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
  justify-content: flex-end;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
`;

const DescText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
  text-align: justify;
  margin-horizontal: 5px;
  margin-bottom: 35px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.inactiveTint};
  margin: 3px;
`;

const ButtonWrapper = styled.View`
  flex: 0.47;
  align-items: center;
`;

const BottomMargin = styled.View`
  margin-bottom: 20px;
`;

const Icon = styled(Ionicons)`
  align-self: center;
  margin-vertical: 20px;
`;

const Spinner = styled.ActivityIndicator`
  margin: 10px;
`;

const ProfileWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 45px;
`;
