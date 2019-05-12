import React from "react";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard
} from "components/common";
import { styled } from "theme";
import { FlatList, RefreshControl } from "react-native";
import { RunModel } from "../types/models";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { Action } from "../actions/common";
import { PastState } from "../types/states";
import { connect } from "react-redux";
import * as actions from "../actions";
import { SafeAreaView } from "react-navigation";
//import firebase from "firebase";

interface PropsConnectedState {
  pastRuns: RunModel[];
  loading: boolean;
}

interface PropsConnectedDispatcher {
  getPastRuns: () => Action<void>;
  setPastRun: (run: any) => Action<object>;
}

interface Props extends PropsConnectedState, PropsConnectedDispatcher {
  navigation: { navigate: (screen: string, params?: any) => void };
}

class PastScreen extends React.Component<Props> {
  /*async componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log(token);
    }
  }*/

  navigateToDetails(run: any) {
    this.props.setPastRun(run);
    this.props.navigation.navigate("RunDetailsScreen");
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("pastTitle")} />
        <ContentWrapper>
          <FlatList
            data={this.props.pastRuns}
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
        </ContentWrapper>
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={this.props.loading}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  past
}: {
  past: PastState;
}): PropsConnectedState => {
  return {
    pastRuns: past.pastRuns,
    loading: past.loading
  };
};

export default connect(
  mapStateToProps,
  actions
)(PastScreen as React.ComponentClass<Props>);

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;
