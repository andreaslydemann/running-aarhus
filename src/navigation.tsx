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
import { TABS, TABBAR_ICONS } from "constants";

const ScheduleStack = createStackNavigator(
  { ScheduleScreen },
  { headerMode: "none" }
);
const PlanningStack = createStackNavigator(
  { PlanningScreen, RunDetails },
  { headerMode: "none" }
);
const PastStack = createStackNavigator({ PastScreen }, { headerMode: "none" });
const SettingsStack = createStackNavigator(
  { SettingsScreen },
  { headerMode: "none" }
);

const options = (label: string, icon: string) => {
  return {
    tabBarLabel: label,
    tabBarIcon: ({ tintColor }: TabScene) => (
      <Ionicons name={icon} size={22} color={tintColor} />
    )
  };
};

ScheduleStack.navigationOptions = options(TABS.Schedule, TABBAR_ICONS.Schedule);
PlanningStack.navigationOptions = options(TABS.Planning, TABBAR_ICONS.Planning);
PastStack.navigationOptions = options(TABS.Past, TABBAR_ICONS.Past);
SettingsStack.navigationOptions = options(TABS.Settings, TABBAR_ICONS.Settings);

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
  { headerMode: "none" }
);

interface Props {
  isAuthenticated: boolean;
}

export default class extends Component<Props> {
  render() {
    const Navigation = createAppContainer(
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

    return <Navigation />;
  }
}
