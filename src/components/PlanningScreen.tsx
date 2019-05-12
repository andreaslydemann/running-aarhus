import React from "react";
import { FlatList, RefreshControl } from "react-native";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  Button,
  PlanningHeader
} from "components/common";
import { styled, theme } from "theme";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { connect } from "react-redux";
import * as actions from "actions";
import { PlanningState } from "types/states";
import { RunModel } from "types/models";
import { RunRequest } from "types/common";
import { SafeAreaView } from "react-navigation";
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

class PlanningScreen extends React.Component<Props> {
  navigateToDetails(run: any) {
    this.props.navigation.navigate("RunDetailsScreen", {
      run,
      type: "planning"
    });
  }

  loadMore = () => {
    const offset = this.props.upcomingRuns.length;
    this.props.getUpcomingRuns(5, offset);
  };

  render(): JSX.Element {
    const { loading, upcomingRuns } = this.props;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("planningTitle")} />
        <ContentWrapper>
          <FlatList
            ListHeaderComponent={
              <PlanningHeader
                onLeftItemPress={() => console.log("clicked")}
                onMiddleItemPress={() =>
                  this.props.navigation.navigate("CreateRunScreen")
                }
                onRightItemPress={() => console.log("clicked")}
              />
            }
            data={this.props.upcomingRuns}
            keyExtractor={(item: RunModel) => item.id}
            renderItem={({ item }) => (
              <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                <RunCard data={item} />
              </PushableWrapper>
            )}
            ListFooterComponent={() => (
              <>
                {upcomingRuns.length ? (
                  loading ? (
                    <Spinner color={theme.activeTint} size="large" />
                  ) : (
                    <LoadMoreButton
                      title="Load more"
                      onPress={this.loadMore}
                      disabled={this.props.loading}
                    />
                  )
                ) : null}
              </>
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
        </ContentWrapper>
        <StatusModal
          type={statusModalTypes.ERROR}
          isVisible={this.props.error}
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
  margin: 0px 20% 20px 20%;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

const Spinner = styled.ActivityIndicator`
  margin: 10px;
`;
