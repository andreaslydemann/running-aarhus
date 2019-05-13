import React from "react";
import { FlatList, RefreshControl } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard
} from "components/common";
import { styled } from "theme";
import { Action } from "actions/common";
import * as actions from "actions";
import { connect } from "react-redux";
import { ScheduleState } from "types/states";
import { RunModel } from "types/models";
import { navigation } from "../utils";
import { SafeAreaView } from "react-navigation";
import { StatusModal, statusModalTypes } from "./common/StatusModal";

interface PropsConnectedState {
  scheduledRuns: RunModel[];
  loading: boolean;
}

interface PropsConnectedDispatcher {
  getScheduledRuns: () => Action<void>;
  setScheduledRun: (run: any) => Action<object>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string, params?: any) => void };
}

class ScheduleScreen extends React.Component<Props> {
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

  render(): JSX.Element {
    const { loading, scheduledRuns } = this.props;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("scheduleTitle")} />
        <ContentWrapper>
          <FlatList
            data={scheduledRuns}
            keyExtractor={(item: RunModel) => item.id}
            renderItem={({ item }) => (
              <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                <RunCard data={item} />
              </PushableWrapper>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  this.props.getScheduledRuns();
                }}
                tintColor="#fff"
              />
            }
          />
        </ContentWrapper>
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !scheduledRuns.length}
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
    loading: schedule.loading
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

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;
