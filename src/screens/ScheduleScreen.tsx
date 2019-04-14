import React from "react";
import { FlatList, RefreshControl } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard
} from "components";
import { styled } from "theme";
import { Action } from "actions/common";
import * as actions from "actions";
import { connect } from "react-redux";
import { RunState } from "reducers/states";
import { RunModel } from "reducers/models";

interface PropsConnectedState {
  scheduledRuns: RunModel[];
}

interface PropsConnectedDispatcher {
  getScheduledRuns: () => Action<void>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string) => void };
}

class ScheduleScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.getScheduledRuns();
  }

  navigateToDetails(data: any) {
    console.log(data);
    this.props.navigation.navigate("RunDetails");
  }

  render(): JSX.Element {
    console.log(this.props.scheduledRuns);

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("scheduleTitle")} />
        <FlatList
          data={this.props.scheduledRuns}
          keyExtractor={(item: RunModel) => item.id}
          renderItem={({ item }) => (
            <PushableWrapper onPress={() => this.navigateToDetails(item)}>
              <RunCard data={item} />
            </PushableWrapper>
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                console.log("hello");
              }}
              tintColor="#fff"
            />
          }
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ run }: { run: RunState }): PropsConnectedState => {
  return {
    scheduledRuns: run.scheduledRuns
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
