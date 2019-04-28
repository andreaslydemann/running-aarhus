import React from "react";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";
import {
  ScreenTitle,
  ScreenBackground,
  PushableWrapper,
  RunCard,
  Button
} from "components/common";
import { styled, theme, THEME_PREFIX } from "theme";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class PlanningScreen extends React.Component<Props> {
  navigateToDetails(data: any) {
    console.log(data);
    this.props.navigation.navigate("RunDetails");
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
        <ActionButton
          size={48}
          offsetY={105}
          offsetX={20}
          buttonColor={theme.action}
        >
          <ActionButton.Item
            size={40}
            buttonColor={theme.action}
            title="Create Run"
            onPress={() => this.props.navigation.navigate("CreateRun")}
          >
            <Icon
              name={`${THEME_PREFIX}-add-circle-outline`}
              size={30}
              color={theme.activeTint}
            />
          </ActionButton.Item>
          <ActionButton.Item
            size={40}
            buttonColor={theme.action}
            title="My Runs"
            onPress={() => {}}
          >
            <Icon
              name={`${THEME_PREFIX}-contact`}
              size={30}
              color={theme.activeTint}
            />
          </ActionButton.Item>
          <ActionButton.Item
            size={40}
            buttonColor={theme.action}
            title="All Runs"
            onPress={() => {}}
          >
            <Icon
              name={`${THEME_PREFIX}-contacts`}
              size={30}
              color={theme.activeTint}
            />
          </ActionButton.Item>
        </ActionButton>
      </Wrapper>
    );
  }
}

const Icon = styled(Ionicons)`
  margin-top: 3px;
  margin-left: 1px;
`;

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0px 20% 20px 20%;
`;
