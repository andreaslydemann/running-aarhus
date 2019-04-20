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
import { styled } from "theme";

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
        <ActionButton offsetY={100} buttonColor="#1481BA">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log("notes tapped!")}
          >
            <Ionicons name={"ios-list"} size={22} color={"#fff"} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}
          >
            <Ionicons name={"ios-list"} size={22} color={"#fff"} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => {}}
          >
            <Ionicons name={"ios-list"} size={22} color={"#fff"} />
          </ActionButton.Item>
        </ActionButton>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0px 20% 20px 20%;
`;
