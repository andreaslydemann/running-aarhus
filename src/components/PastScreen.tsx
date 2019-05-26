import React from "react";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  InfoCard
} from "components/common";
import { styled } from "theme";
import { FlatList, RefreshControl, ScrollView } from "react-native";
import { RunModel } from "../types/models";
import { Action } from "../actions/common";
import { PastState } from "../types/states";
import { connect } from "react-redux";
import * as actions from "../actions";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import firebase from "firebase";

interface PropsConnectedState {
  pastRuns: RunModel[];
  loading: boolean;
  error: boolean;
}

interface PropsConnectedDispatcher {
  getPastRuns: () => Action<void>;
  setRun: (run: any) => Action<object>;
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

  async componentDidMount() {
    this.props.getPastRuns();

    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log(token);
    }
  }

  runSelected = (run: any) => {
    this.props.setRun(run);
    this.props.navigation.navigate("RunDetailsScreen");
  };

  refreshRuns = () => {
    this.setState({ refreshing: true });
    this.props.getPastRuns();
  };

  renderContent(): JSX.Element {
    const { error, loading, pastRuns } = this.props;
    const { refreshing } = this.state;

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

    if (loading && !refreshing) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !refreshing}
        />
      );
    }

    if (pastRuns.length) {
      return (
        <FlatList
          data={pastRuns}
          keyExtractor={(item: RunModel) => item.id}
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

    return (
      <ScrollView>
        <InfoCard
          title="No past runs"
          subtitle="Sign up to a run"
          showTextOnly={true}
        />
      </ScrollView>
    );
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("pastTitle")} />

        {this.renderContent()}
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
    loading: past.loading,
    error: past.error
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

const BottomMargin = styled.View`
  margin-bottom: 30px;
`;
