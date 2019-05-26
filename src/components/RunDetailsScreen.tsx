import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Image, View } from "react-native";
import { Header, Button, ScreenBackground } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { RunState } from "types/states";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { connect } from "react-redux";
import * as actions from "../actions";
import i18n from "i18n-js";
import moment from "moment";
import { getLanguage } from "utils";

interface PropsConnectedState {
  run: RunState;
}

interface PropsConnectedDispatcher {
  saveParticipation: (runId: string) => void;
  cancelParticipation: (runId: string) => void;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
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
    const {
      id,
      startDateTime,
      title,
      routeDetails,
      description,
      pace,
      participating,
      loading
    } = this.props.run;

    const _routeDetails = {
      meetingPoint: routeDetails ? routeDetails.meetingPoint : "",
      distance: routeDetails ? routeDetails.distance : 0,
      coordinates: routeDetails ? routeDetails.coordinates : [],
      endDateTime: routeDetails ? routeDetails.endDateTime : new Date()
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
              <InfoText>{_routeDetails.distance} km</InfoText>
            </BottomMargin>
            {pace && (
              <BottomMargin>
                <SectionTitle>Pace</SectionTitle>
                <InfoText>{pace} min/km</InfoText>
              </BottomMargin>
            )}
            <SectionTitle>Meeting point</SectionTitle>
            <InfoText>{_routeDetails.meetingPoint}</InfoText>
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
              <LinkButton
                icon={`${THEME_PREFIX}-people`}
                onPress={() =>
                  this.props.navigation.navigate("ParticipantsScreen")
                }
              />
              <ButtonLabel>Participants</ButtonLabel>
            </ButtonWrapper>
            <ButtonWrapper>
              <LinkButton
                disabled={!routeDetails}
                icon={`${THEME_PREFIX}-map`}
                onPress={() => {
                  this.props.navigation.navigate("ShowRouteScreen", {
                    ..._routeDetails,
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
              <LinkButton
                type={"destructive"}
                title="Cancel"
                onPress={() => this.props.saveParticipation(id)}
              />
            ) : (
              <LinkButton
                type={"submit"}
                title="Join"
                onPress={() => this.props.cancelParticipation(id)}
              />
            )}
          </ButtonWrapper>
        </ScrollWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ run }: { run: RunState }): PropsConnectedState => {
  return { run };
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

const LinkButton = styled(Button)`
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
