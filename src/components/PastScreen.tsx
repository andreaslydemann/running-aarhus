import React from "react";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  InfoCard,
  StatsHeader
} from "components/common";
import { styled } from "theme";
import { FlatList, RefreshControl } from "react-native";
import { RunModel } from "types/models";
import { Action } from "types/common";
import { PastState } from "types/states";
import { connect } from "react-redux";
import * as actions from "actions";
import { StatusModal, statusModalTypes } from "./common/StatusModal";
import { DETAILS_REDUCERS, RUN_TYPES } from "constants";
//import firebase from "firebase";

interface PropsConnectedState {
  pastRuns: RunModel[];
  loading: boolean;
  error: boolean;
}

interface PropsConnectedDispatcher {
  getPastRuns: () => Action<void>;
  setDetails: (run: RunModel, runType: string) => Action<RunModel>;
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

  /*async componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      console.log(token);
    }
  }*/

  runSelected = (run: any) => {
    this.props.setDetails(run, RUN_TYPES.PAST);
    this.props.navigation.navigate("RunDetailsScreen", {
      isPastRun: true,
      reducer: DETAILS_REDUCERS.PAST,
      runType: RUN_TYPES.PAST
    });
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

    if (loading && !pastRuns.length) {
      return (
        <StatusModal
          type={statusModalTypes.LOADING}
          isVisible={loading && !pastRuns.length}
        />
      );
    }

    if (pastRuns.length) {
      return (
        <PastList
          ListHeaderComponent={
            <BottomMargin>
              <StatsHeader numberOfRuns={pastRuns.length} />
            </BottomMargin>
          }
          data={pastRuns}
          keyExtractor={(item: any) => item.id}
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
      <Padding>
        <InfoCard
          title={i18n.t("missingPastRunsTitle")}
          subtitle={i18n.t("missingPastRunsSubtitle")}
        />
      </Padding>
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

const Padding = styled.ScrollView`
  padding: 20px 20px 30px 20px;
`;

const PastList = styled(FlatList)`
  margin: 20px 20px 0px 20px;
  padding-bottom: 20px;
`;
