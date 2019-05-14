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
import { Action } from "../actions/common";
import { PastState } from "../types/states";
import { connect } from "react-redux";
import * as actions from "../actions";
import { SafeAreaView } from "react-navigation";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
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

interface State {
  refreshing: boolean;
}

class PastScreen extends React.Component<Props, State> {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.props.getPastRuns();
  }

  /*async componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log(token);
    }
  }*/

  navigateToDetails(run: any) {
    this.props.setPastRun(run);
    this.props.navigation.navigate("RunDetailsScreen", {
      run,
      type: "past"
    });
  }

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getPastRuns();
  };

  render(): JSX.Element {
    const { loading, pastRuns } = this.props;
    const { refreshing } = this.state;

    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("pastTitle")} />
        <ContentWrapper>
          <FlatList
            data={pastRuns}
            keyExtractor={(item: RunModel) => item.id}
            renderItem={({ item }) => (
              <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                <RunCard data={item} />
              </PushableWrapper>
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading && refreshing}
                onRefresh={this.refreshRuns}
                tintColor="#fff"
              />
            }
          />
        </ContentWrapper>
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !refreshing}
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
