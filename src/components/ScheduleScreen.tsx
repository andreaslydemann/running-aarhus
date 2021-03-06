import React from "react";
import { FlatList, RefreshControl } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  InfoCard,
  CountdownCard,
  PromotionCard
} from "components/common";
import { styled } from "theme";
import * as actions from "actions";
import { connect } from "react-redux";
import { ScheduleState } from "types/states";
import { RunModel } from "types/models";
import { navigation, sortRunsByDate } from "utils";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { RunRequest, Action } from "types/common";
import { DETAILS_REDUCERS, RUN_TYPES } from "constants";

interface PropsConnectedState {
  scheduledRuns: RunModel[];
  loading: boolean;
  error: boolean;
}

interface PropsConnectedDispatcher {
  getCurrentUserRequest: () => void;
  getUpcomingRuns: (numberOfRuns: number, offset: string) => Action<RunRequest>;
  getMyRuns: () => Action<RunRequest>;
  getPastRuns: () => Action<void>;
  getScheduledRuns: () => Action<void>;
  setDetails: (run: RunModel, runType: string) => Action<RunModel>;
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
    this.props.getCurrentUserRequest();
    this.props.getScheduledRuns();
    this.props.getUpcomingRuns(5, "");
    this.props.getMyRuns();
    this.props.getPastRuns();
  }

  runSelected = (run: any) => {
    this.props.setDetails(run, RUN_TYPES.SCHEDULE);

    this.props.navigation.navigate("RunDetailsScreen", {
      reducer: DETAILS_REDUCERS.SCHEDULE,
      runType: RUN_TYPES.SCHEDULE
    });
  };

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getScheduledRuns();
  };

  renderList(): JSX.Element {
    const { scheduledRuns, loading } = this.props;
    const { refreshing } = this.state;

    const sortedRuns = sortRunsByDate(scheduledRuns);

    return (
      <ScheduleList
        ListHeaderComponent={
          <BottomMargin>
            <CountdownCard runDate={sortedRuns[0].startDateTime} />
          </BottomMargin>
        }
        data={sortedRuns}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <BottomMargin>
            <PushableWrapper onPress={() => this.runSelected(item)}>
              {item.promoted ? (
                <PromotionCard data={item} />
              ) : (
                <RunCard data={item} />
              )}
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
    );
  }

  renderContent(): JSX.Element {
    const { error, loading, scheduledRuns } = this.props;

    if (error) {
      return (
        <Padding>
          <InfoCard
            title={i18n.t("runsFetchingErrorTitle")}
            onPress={this.refreshRuns}
            loading={loading}
            showButton={true}
            buttonText={i18n.t("retry")}
          />
        </Padding>
      );
    }

    if (loading && !scheduledRuns.length) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !scheduledRuns.length}
        />
      );
    }

    if (scheduledRuns.length) {
      return this.renderList();
    }

    return (
      <Padding>
        <InfoCard
          title={i18n.t("missingScheduledRunsTitle")}
          subtitle={i18n.t("missingScheduledRunsSubtitle")}
        />
      </Padding>
    );
  }

  render(): JSX.Element {
    return (
      <ScreenBackground>
        <ScreenTitle title={i18n.t("scheduleTitle")} />

        {this.renderContent()}
      </ScreenBackground>
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

const BottomMargin = styled.View`
  margin-bottom: 30px;
`;

const Padding = styled.ScrollView`
  padding: 20px 20px 30px 20px;
`;

const ScheduleList = styled(FlatList)`
  margin: 20px 20px 0px 20px;
  padding-bottom: 20px;
`;
