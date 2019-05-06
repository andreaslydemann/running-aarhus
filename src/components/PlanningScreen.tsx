import React from "react";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
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
import * as actions from "../actions";
import { RunState } from "../types/states";

interface PropsConnectedState {
  error: boolean;
}

interface Props extends PropsConnectedState {
  navigation: { navigate: (screen: string) => void };
}

class PlanningScreen extends React.Component<Props> {
  navigateToDetails(data: any) {
    console.log(data);
    this.props.navigation.navigate("RunDetailsScreen");
  }

  render(): JSX.Element {
    const showMoreEnabled = false;

    const data = {
      runs: [
        {
          id: 1,
          netstamp: Date.now(),
          label: "hello",
          name: "Intervaller Lørdag",
          location: "Ceres Park"
        }
      ]
    };
    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("planningTitle")} />

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
          data={data.runs}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PushableWrapper onPress={() => this.navigateToDetails(item)}>
              <RunCard data={item} />
            </PushableWrapper>
          )}
          ListFooterComponent={() => (
            <>
              {showMoreEnabled ? (
                <ActivityIndicator size="large" />
              ) : (
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

const mapStateToProps = ({ run }: { run: RunState }): PropsConnectedState => {
  return {
    error: run.error
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
