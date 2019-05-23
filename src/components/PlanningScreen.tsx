import React from "react";
import { FlatList, RefreshControl, ScrollView } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  Button,
  PlanningHeader,
  InfoCard
} from "components/common";
import { styled, theme } from "theme";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { connect } from "react-redux";
import * as actions from "actions";
import { PlanningState } from "types/states";
import { RunModel } from "types/models";
import { RunRequest } from "types/common";
import { Action } from "actions/common";

interface PropsConnectedState {
  error: boolean;
  loading: boolean;
  upcomingRuns: RunModel[];
}

interface PropsConnectedDispatcher {
  getUpcomingRuns: (numberOfRuns: number, offset: number) => Action<RunRequest>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string, params?: any) => void };
}

interface State {
  refreshing: boolean;
}

class PlanningScreen extends React.Component<Props, State> {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.props.getUpcomingRuns(10, 0);
  }

  navigateToDetails(run: any) {
    this.props.navigation.navigate("RunDetailsScreen", {
      run,
      type: "planning"
    });
  }

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getUpcomingRuns(this.props.upcomingRuns.length, 0);
  };

  loadMore = () => {
    this.setState({ refreshing: false });
    const offset = this.props.upcomingRuns.length;
    this.props.getUpcomingRuns(5, offset);
  };

  renderList(): JSX.Element {
    const { upcomingRuns, navigation, loading } = this.props;
    const { refreshing } = this.state;

    return (
      <FlatList
        ListHeaderComponent={
          <BottomMargin>
            <PlanningHeader
              onLeftItemPress={() => console.log("clicked")}
              onMiddleItemPress={() => navigation.navigate("CreateRunScreen")}
              onRightItemPress={() => console.log("clicked")}
            />
          </BottomMargin>
        }
        data={upcomingRuns}
        keyExtractor={(item: RunModel) => item.id}
        renderItem={({ item }) => (
          <BottomMargin>
            <PushableWrapper onPress={() => this.navigateToDetails(item)}>
              <RunCard data={item} />
            </PushableWrapper>
          </BottomMargin>
        )}
        ListFooterComponent={() => (
          <>
            {upcomingRuns.length ? (
              loading && !refreshing ? (
                <Spinner color={theme.activeTint} size="large" />
              ) : (
                <LoadMoreButton
                  title="Load more"
                  onPress={this.loadMore}
                  disabled={loading}
                />
              )
            ) : null}
          </>
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
    const { error, loading, upcomingRuns } = this.props;

    if (error) {
      return (
        <ScrollView>
          <InfoCard
            title="Error while fetching runs"
            subtitle="Try again later"
            onPress={this.refreshRuns}
            loading={loading}
          />
        </ScrollView>
      );
    }

    if (loading && !upcomingRuns.length) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !upcomingRuns.length}
        />
      );
    }

    return this.renderList();
  }

  render(): JSX.Element {
    const { error } = this.props;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("planningTitle")} />

        {this.renderContent()}

        <StatusModal
          type={statusModalTypes.ERROR}
          isVisible={error}
          height={135}
          width={115}
          textNumberOfLines={2}
          text={"Oprettelse mislykkedes"}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  planning
}: {
  planning: PlanningState;
}): PropsConnectedState => {
  return {
    upcomingRuns: planning.upcomingRuns,
    error: planning.error,
    loading: planning.loading
  };
};

export default connect(
  mapStateToProps,
  actions
)(PlanningScreen as React.ComponentClass<Props>);

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0px 20% 30px 20%;
`;

const Spinner = styled.ActivityIndicator`
  margin: 10px;
`;

const BottomMargin = styled.View`
  margin-bottom: 30px;
`;
