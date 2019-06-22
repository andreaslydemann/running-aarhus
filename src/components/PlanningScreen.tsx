import React from "react";
import { FlatList, RefreshControl } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  Button,
  PlanningHeader,
  InfoCard,
  PromotionCard
} from "components/common";
import { styled, theme } from "theme";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { connect } from "react-redux";
import * as actions from "actions";
import { PlanningState } from "types/states";
import { RunModel } from "types/models";
import { Item, RunRequest, Action } from "types/common";
import { DETAILS_REDUCERS, RUN_TYPES } from "constants";

interface PropsConnectedState {
  error: boolean;
  loading: boolean;
  upcomingRuns: RunModel[];
  myRuns: RunModel[];
  selectedItem: Item;
}

interface PropsConnectedDispatcher {
  getUpcomingRuns: (numberOfRuns: number, offset: string) => Action<RunRequest>;
  getMyRuns: () => Action<RunRequest>;
  setDetails: (run: RunModel, runType: string) => Action<RunModel>;
  setSelectedItem: (item: Item) => Action<Item>;
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

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getUpcomingRuns(this.props.upcomingRuns.length, "");
    this.props.getMyRuns();
  };

  loadMore = () => {
    this.setState({ refreshing: false });
    const offset = this.props.upcomingRuns.slice(-1)[0].id;

    this.props.getUpcomingRuns(5, offset);
  };

  runSelected = (run: any) => {
    this.props.setDetails(run, RUN_TYPES.PLANNING);
    this.props.navigation.navigate("RunDetailsScreen", {
      reducer: DETAILS_REDUCERS.PLANNING,
      runType: RUN_TYPES.PLANNING
    });
  };

  renderList(): JSX.Element {
    const {
      upcomingRuns,
      myRuns,
      navigation,
      loading,
      selectedItem
    } = this.props;
    const { refreshing } = this.state;
    const showingUpcomingRuns = selectedItem === Item.Left;

    return (
      <PlanningList
        ListHeaderComponent={
          <BottomMargin>
            <PlanningHeader
              onLeftItemPress={() => this.props.setSelectedItem(Item.Left)}
              onMiddleItemPress={() => navigation.navigate("SetRunScreen")}
              onRightItemPress={() => this.props.setSelectedItem(Item.Right)}
              selectedItem={selectedItem}
            />
            {!showingUpcomingRuns && myRuns.length === 0 && (
              <TopMargin>
                <InfoCard
                  title={i18n.t("missingRunsTitle")}
                  subtitle={i18n.t("missingRunsSubtitle")}
                />
              </TopMargin>
            )}
          </BottomMargin>
        }
        extraData={this.props}
        data={showingUpcomingRuns ? upcomingRuns : myRuns}
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
        ListFooterComponent={() => (
          <>
            {showingUpcomingRuns && upcomingRuns.length ? (
              loading && !refreshing ? (
                <Spinner color={theme.activeTint} size="large" />
              ) : (
                <LoadMoreButton
                  title={i18n.t("loadMore")}
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
    const { error, loading, upcomingRuns, myRuns } = this.props;

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

    if (loading && !upcomingRuns.length && !myRuns.length) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !upcomingRuns.length && !myRuns.length}
        />
      );
    }

    return this.renderList();
  }

  render(): JSX.Element {
    return (
      <ScreenBackground>
        <ScreenTitle title={i18n.t("planningTitle")} />

        {this.renderContent()}
      </ScreenBackground>
    );
  }
}

const mapStateToProps = ({
  planning
}: {
  planning: PlanningState;
}): PropsConnectedState => {
  return {
    selectedItem: planning.selectedItem,
    upcomingRuns: planning.upcomingRuns,
    myRuns: planning.myRuns,
    error: planning.error,
    loading: planning.loading
  };
};

export default connect(
  mapStateToProps,
  actions
)(PlanningScreen as React.ComponentClass<Props>);

const LoadMoreButton = styled(Button)`
  margin: 0px 20% 30px 20%;
`;

const Spinner = styled.ActivityIndicator`
  margin-top: 10px;
  margin-bottom: 50px;
`;

const BottomMargin = styled.View`
  margin-bottom: 30px;
`;

const TopMargin = styled.View`
  margin-top: 30px;
`;

const Padding = styled.ScrollView`
  padding: 20px 20px 30px 20px;
`;

const PlanningList = styled(FlatList)`
  margin: 20px 20px 0px 20px;
  padding-bottom: 20px;
`;
