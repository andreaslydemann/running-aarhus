import React from "react";
import { FlatList, RefreshControl } from "react-native";
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
  setDetails: (run: RunModel) => Action<RunModel>;
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

  runSelected = (run: any) => {
    this.props.setDetails(run);
    this.props.navigation.navigate("RunDetailsScreen");
  };

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getScheduledRuns();
  };

  renderList(): JSX.Element {
    const { scheduledRuns, loading } = this.props;
    const { refreshing } = this.state;
    const showPromotionCard = true;

    return (
      <ScheduleList
        ListHeaderComponent={
          showPromotionCard ? (
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
          ) : null
        }
        data={scheduledRuns}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <BottomMargin>
            <PushableWrapper onPress={() => this.runSelected(item)}>
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
    );
  }

  renderContent(): JSX.Element {
    const { error, loading, scheduledRuns } = this.props;
    const { refreshing } = this.state;

    if (error) {
      return (
        <Padding>
          <InfoCard
            title="Error while fetching runs"
            subtitle="Try again later"
            onPress={this.refreshRuns}
            loading={loading}
          />
        </Padding>
      );
    }

    if (loading && !refreshing) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !refreshing}
        />
      );
    }

    if (scheduledRuns.length) {
      return this.renderList();
    }

    return (
      <Padding>
        <InfoCard
          title="Your schedule is empty"
          subtitle="Sign up to a run"
          showTextOnly={true}
        />
      </Padding>
    );
  }

  render(): JSX.Element {
    const { error } = this.props;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("scheduleTitle")} />

        {this.renderContent()}

        <StatusModal
          type={statusModalTypes.ERROR}
          isVisible={error}
          height={135}
          width={115}
          textNumberOfLines={2}
          text={"Fejl opstået"}
        />
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
  margin-bottom: 30px;
`;

const Padding = styled.ScrollView`
  padding: 20px 20px 30px 20px;
`;

const ScheduleList = styled(FlatList)`
  margin: 20px 20px 0px 20px;
  padding-bottom: 20px;
`;
