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
import { styled } from "theme";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { connect } from "react-redux";
import * as actions from "actions";
import { PlanningState } from "types/states";
import { RunModel } from "types/models";
import { SafeAreaView } from "react-navigation";

interface PropsConnectedState {
  error: boolean;
  loading: boolean;
  upcomingRuns: RunModel[];
}

interface Props extends PropsConnectedState {
  navigation: { navigate: (screen: string, params?: any) => void };
}

class PlanningScreen extends React.Component<Props> {
  navigateToDetails(run: any) {
    this.props.navigation.navigate("RunDetailsScreen", {
      run,
      type: "planning"
    });
  }

  render(): JSX.Element {
    const showMoreEnabled = this.props.upcomingRuns.length > 0;

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
                {showMoreEnabled && (
                  <LoadMoreButton
                    title="Load more"
                    onPress={() => {
                      console.log("hello");
                    }}
                    disabled={false}
                  />
                )}
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
          type={statusModalTypes.LOADING}
          isVisible={this.props.loading}
        />
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
