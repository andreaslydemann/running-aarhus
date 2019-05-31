import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Image, View } from "react-native";
import { Header, Button, ScreenBackground } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { DetailsState } from "types/states";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { connect } from "react-redux";
import * as actions from "../actions";
import i18n from "i18n-js";
import moment from "moment";
import { getLanguage } from "utils";
import { RunModel } from "types/models";

interface PropsConnectedDispatcher {
  saveParticipation: (run: RunModel) => void;
  cancelParticipation: (run: RunModel) => void;
}

interface Props extends DetailsState, PropsConnectedDispatcher {
  showActionSheetWithOptions: (options: any, callback: any) => void;
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: (nullArg?: null) => void;
    getParam: (param: string) => any;
  };
}

class RunDetailsScreen extends Component<Props> {
  onOpenActionSheet = () => {
    const options = [
      i18n.t("optionEdit"),
      i18n.t("optionDelete"),
      i18n.t("optionCancel")
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
            console.log("editing");
            break;
          case 1:
            console.log("deleting");
            break;
          default:
            break;
        }
      }
    );
  };

  render() {
    const { loading, run } = this.props;
    const {
      startDateTime,
      title,
      description,
      pace,
      participating,
      participants
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

    return (
      <Wrapper>
        <Header
          ScreenTitle={title}
          navigateBack={() => this.props.navigation.goBack(null)}
          showMoreButton={true}
          onMoreButtonPress={this.onOpenActionSheet}
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 35
            }}
          >
            <Image
              style={{ height: 60, width: 60 }}
              source={require("../../assets/logo.png")}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: 5
              }}
            >
              <SectionTitle>Arrangør:</SectionTitle>
              <InfoText>Anders Andersen</InfoText>
            </View>
          </View>

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
        </ScrollWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  details
}: {
  details: DetailsState;
}): DetailsState => {
  return { ...details };
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
