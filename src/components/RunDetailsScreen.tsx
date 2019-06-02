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
import { DetailsState } from "types/states";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { connect } from "react-redux";
import * as actions from "../actions";
import i18n from "i18n-js";
import moment from "moment";
import { getLanguage } from "utils";
import { RunModel } from "types/models";
import { Text } from "react-native";
import { StatusModal, statusModalTypes } from "./common/StatusModal";

interface State {
  dialogVisible: boolean;
  recentlyCancelled: boolean;
}

interface PropsConnectedDispatcher {
  saveParticipation: (run: RunModel) => void;
  cancelParticipation: (run: RunModel) => void;
  cancelRun: (runId: string) => void;
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
    dialogVisible: false,
    recentlyCancelled: false
  };

  openActionSheet = () => {
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
            this.props.navigation.navigate("SetRunScreen");
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
    const { cancelRun, run } = this.props;

    return (
      <Dialog
        onTouchOutside={() => {
          this.setState({ dialogVisible: false });
        }}
        width={0.89}
        visible={this.state.dialogVisible}
        dialogAnimation={new ScaleAnimation()}
        dialogTitle={<DialogTitle title={"Confirm"} hasTitleBar={false} />}
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
                    dialogVisible: false,
                    recentlyCancelled: true
                  },
                  () => {
                    cancelRun(run.id);
                  }
                );
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ alignItems: "center" }}>
          <Text>Are you sure you want to cancel this run?</Text>
        </DialogContent>
      </Dialog>
    );
  };

  render() {
    const isPastRun = this.props.navigation.getParam("isPastRun");
    const { recentlyCancelled } = this.state;
    const { error, success, loading, run } = this.props;

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

    const startDate = new Date(startDateTime);
    const startTimeString = moment(startDate)
      .locale(getLanguage())
      .format("LLLL");

    const showMoreButton = !(cancelled || recentlyCancelled || isPastRun);

    return (
      <Wrapper>
        <Header
          ScreenTitle={(cancelled ? "Cancelled: " : "") + title}
          navigateBack={() => this.props.navigation.goBack(null)}
          showMoreButton={showMoreButton}
          onMoreButtonPress={this.openActionSheet}
        />
        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <DetailsWrapper>
            <BottomMargin>
              <SectionTitle>Date</SectionTitle>
              <InfoText>{startTimeString}</InfoText>
            </BottomMargin>
            <BottomMargin>
              <SectionTitle>Distance</SectionTitle>
              <InfoText>{routeDetails.distance} km</InfoText>
            </BottomMargin>
            {pace && (
              <BottomMargin>
                <SectionTitle>Pace</SectionTitle>
                <InfoText>{pace} min/km</InfoText>
              </BottomMargin>
            )}
            <SectionTitle>Meeting point</SectionTitle>
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
                  this.props.navigation.navigate("ParticipantsScreen", {
                    participants
                  })
                }
              />
              <ButtonLabel>Participants</ButtonLabel>
            </ButtonWrapper>
            <ButtonWrapper>
              <StyledButton
                disabled={!routeDetails}
                icon={`${THEME_PREFIX}-map`}
                onPress={() => {
                  this.props.navigation.navigate("ShowRouteScreen", {
                    ...routeDetails,
                    pace
                  });
                }}
              />
              <ButtonLabel>Route</ButtonLabel>
            </ButtonWrapper>
          </Row>

          {!(isPastRun || run.cancelled) && (
            <ButtonWrapper>
              {loading ? (
                <Spinner color={theme.activeTint} size="large" />
              ) : participating ? (
                <StyledButton
                  type={"destructive"}
                  title="Cancel"
                  onPress={() => this.props.cancelParticipation(this.props.run)}
                />
              ) : (
                <StyledButton
                  type={"submit"}
                  title="Join"
                  onPress={() => this.props.saveParticipation(this.props.run)}
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
          text={"Fejl opstået"}
        />

        {this.renderDialog()}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  details
}: {
  details: DetailsState;
}): DetailsState => {
  return details;
};

export default connectActionSheet(
  connect(
    mapStateToProps,
    actions
  )(RunDetailsScreen as React.ComponentClass<Props>)
);

const Wrapper = styled(ScreenBackground)`
  padding: 44px 0 0 0;
  flex: 1;
`;

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
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 16px;
`;

const DescText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
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
  margin-bottom: 18px;
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
