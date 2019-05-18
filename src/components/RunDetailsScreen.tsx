import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Image, View } from "react-native";
import { Header, Button, ScreenBackground } from "components/common";
import { Ionicons } from "@expo/vector-icons";
import { PastState, PlanningState, ScheduleState } from "../types/states";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment";
import { getLanguage } from "utils";

interface PropsConnectedState {
  loading: boolean;
}

interface PropsConnectedDispatcher {}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: (nullArg?: null) => void;
    getParam: (param: string) => any;
  };
}

class RunDetailsScreen extends Component<Props> {
  openMap({ longitude, latitude }: { longitude: number; latitude: number }) {
    console.log(longitude, latitude);
  }

  render() {
    const run = this.props.navigation.getParam("run");

    const startDate = new Date(run.startDateTime);
    const startTimeString = moment(startDate)
      .locale(getLanguage())
      .format("LLLL");

    return (
      <Wrapper>
        <Header
          ScreenTitle={run.title}
          navigateBack={() => this.props.navigation.goBack(null)}
        />
        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <DetailsWrapper>
            <BottomMargin>
              <SectionTitle>Date</SectionTitle>
              <InfoText>{startTimeString}</InfoText>
            </BottomMargin>
            <BottomMargin>
              <SectionTitle>Distance</SectionTitle>
              <InfoText>{run.distance} km</InfoText>
            </BottomMargin>
            {run.pace && (
              <BottomMargin>
                <SectionTitle>Pace</SectionTitle>
                <InfoText>{run.pace} min/km</InfoText>
              </BottomMargin>
            )}
            <SectionTitle>Meeting point</SectionTitle>
            <InfoText>{run.meetingPoint}</InfoText>
          </DetailsWrapper>

          <Icon
            name={`${THEME_PREFIX}-walk`}
            size={40}
            color={theme.activeTint}
          />

          {run.description ? <DescText>{run.description}</DescText> : null}

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
                icon={`${THEME_PREFIX}-map`}
                onPress={() =>
                  this.props.navigation.navigate("ShowRouteScreen", {
                    coordinates: run.coordinates,
                    meetingPoint: run.meetingPoint,
                    distance: run.distance,
                    endDateTime: run.endDateTime,
                    pace: run.pace
                  })
                }
              />
              <ButtonLabel>Route</ButtonLabel>
            </ButtonWrapper>
          </Row>

          <ButtonWrapper>
            <LinkButton title="Join" onPress={() => console.log("hello")} />
          </ButtonWrapper>
        </ScrollWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (
  {
    schedule,
    planning,
    past
  }: {
    schedule: ScheduleState;
    planning: PlanningState;
    past: PastState;
  },
  ownProps: Props
): PropsConnectedState => {
  const type = ownProps.navigation.getParam("type");

  switch (type) {
    case schedule:
      return { loading: schedule.loading };
    case past:
      return { loading: schedule.loading };
    default:
      return { loading: planning.loading };
  }
};

export default connect(
  mapStateToProps,
  actions
)(RunDetailsScreen as React.ComponentClass<Props>);

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
