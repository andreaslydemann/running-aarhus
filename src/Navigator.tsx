import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  TabScene
} from "react-navigation";
import {
  ScheduleScreen,
  SignInScreen,
  PlanningScreen,
  RunDetails,
  PastScreen,
  SettingsScreen
} from "components";
import { TabBar } from "components/common";
import { theme } from "theme";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";

const ScheduleStack = createStackNavigator(
  { ScheduleScreen },
  {
    headerMode: "none"
  }
);

ScheduleStack.navigationOptions = {
  tabBarLabel: "scheduleTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-list"} size={22} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-list"} size={22} color={tintColor} />
  )
};

const PlanningStack = createStackNavigator(
  { PlanningScreen, RunDetails },
  {
    headerMode: "none"
  }
);

PlanningStack.navigationOptions = {
  tabBarLabel: "planningTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-add-circle-outline"} size={22} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-add-circle-outline"} size={22} color={tintColor} />
  )
};

const PastStack = createStackNavigator(
  { PastScreen },
  {
    headerMode: "none"
  }
);

PastStack.navigationOptions = {
  tabBarLabel: "pastTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons
      name={"ios-checkmark-circle-outline"}
      size={22}
      color={tintColor}
    />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons
      name={"md-checkmark-circle-outline"}
      size={22}
      color={tintColor}
    />
  )
};

const SettingsStack = createStackNavigator(
  { SettingsScreen },
  {
    headerMode: "none"
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: "settingsTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-options"} size={22} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-options"} size={22} color={tintColor} />
  )
};

const AppTabBar = createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Planning: PlanningStack,
    Past: PastStack,
    Settings: SettingsStack
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: theme.inactiveTint,
      showLabel: true,
      style: {
        backgroundColor: theme.primary
      }
    }
  }
);

const AuthStack = createStackNavigator(
  { SignIn: SignInScreen },
  {
    headerMode: "none"
  }
);

interface Props {
  isAuthenticated: boolean;
}

export default class Navigator extends Component<Props> {
  render() {
    const Navigator = createAppContainer(
      createSwitchNavigator(
        {
          App: AppTabBar,
          Auth: AuthStack
        },
        {
          initialRouteName: this.props.isAuthenticated ? "App" : "Auth"
        }
      )
    );

    return <Navigator />;
  }
}
