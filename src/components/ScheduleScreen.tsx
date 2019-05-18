import React from "react";
import { FlatList, RefreshControl, ScrollView } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  InfoCard,
  PromotionCard
} from "components/common";
import { styled } from "theme";
import { Action } from "actions/common";
import * as actions from "actions";
import { connect } from "react-redux";
import { ScheduleState } from "types/states";
import { RunModel } from "types/models";
import { navigation } from "utils";
import { StatusModal, statusModalTypes } from "./common/StatusModal";

interface PropsConnectedState {
  scheduledRuns: RunModel[];
  loading: boolean;
  error: boolean;
}

interface PropsConnectedDispatcher {
  getScheduledRuns: () => Action<void>;
  setScheduledRun: (run: any) => Action<object>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string, params?: any) => void };
}

interface State {
  refreshing: boolean;
}

class ScheduleScreen extends React.Component<Props, State> {
  state = {
    refreshing: false
  };

  componentDidMount() {
    navigation.setNavigator(this.props.navigation);
    this.props.getScheduledRuns();
  }

  navigateToDetails(run: any) {
    this.props.setScheduledRun(run);
    this.props.navigation.navigate("RunDetailsScreen", {
      run,
      type: "schedule"
    });
  }

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getScheduledRuns();
  };

  render(): JSX.Element {
    const { error, loading, scheduledRuns } = this.props;
    const { refreshing } = this.state;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("scheduleTitle")} />

        {error ? (
          <ScrollView>
            <InfoCard
              title="Error while fetching runs"
              subtitle="Try again later"
              onPress={this.refreshRuns}
              loading={loading}
            />
          </ScrollView>
        ) : loading && !refreshing ? (
          <StatusModal
            type={statusModalTypes.LOADING}
            isVisible={loading && !refreshing}
          />
        ) : scheduledRuns.length ? (
          <FlatList
            ListHeaderComponent={
              <BottomMargin>
                <PromotionCard
                  run={{
                    title: "Running Challenge",
                    meetingPoint: "Station Allé, Aarhus C",
                    startDateTime: "Monday 27/6 - 17:30"
                  }}
                  navigateToDetails={() => console.log("hello")}
                />
              </BottomMargin>
            }
            data={scheduledRuns}
            keyExtractor={(item: RunModel) => item.id}
            renderItem={({ item }) => (
              <BottomMargin>
                <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                  <RunCard data={item} />
                </PushableWrapper>
              </BottomMargin>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading && refreshing}
                onRefresh={this.refreshRuns}
                tintColor="#fff"
              />
            }
          />
        ) : (
          <ScrollView>
            <InfoCard
              title="Your schedule is empty"
              subtitle="Sign up to a run"
              showTextOnly={true}
            />
          </ScrollView>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  schedule
}: {
  schedule: ScheduleState;
}): PropsConnectedState => {
  return {
    scheduledRuns: schedule.scheduledRuns,
    loading: schedule.loading,
    error: schedule.error
  };
};

export default connect(
  mapStateToProps,
  actions
)(ScheduleScreen as React.ComponentClass<Props>);

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const BottomMargin = styled.View`
  margin-bottom: 20px;
`;
