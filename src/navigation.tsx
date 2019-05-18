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
  PastScreen,
  RunDetailsScreen,
  SettingsScreen,
  CreateRunScreen,
  SetRouteScreen,
  ShowRouteScreen,
  ParticipantsScreen
} from "components";
import { TabBar } from "components/common";
import { theme } from "theme";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TABS, TABBAR_ICONS } from "constants";

const RunDetailsStack = createStackNavigator(
  { RunDetailsScreen, ParticipantsScreen, ShowRouteScreen },
  { headerMode: "none", mode: "modal" }
);

const ScheduleStack = createStackNavigator(
  { ScheduleScreen, RunDetailsStack },
  { headerMode: "none" }
);

const FindRunStack = createStackNavigator(
  { PlanningScreen, RunDetailsStack },
  { headerMode: "none" }
);

const CreateRunStack = createStackNavigator(
  { CreateRunScreen, SetRouteScreen },
  { headerMode: "none" }
);

const PlanningStack = createStackNavigator(
  {
    FindRun: FindRunStack,
    CreateRun: CreateRunStack
  },
  { headerMode: "none", mode: "modal" }
);

const PastStack = createStackNavigator(
  { PastScreen, RunDetailsScreen },
  { headerMode: "none" }
);

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
SettingsStack.navigationOptions = options(TABS.Settings, TABBAR_ICONS.Settings);
PastStack.navigationOptions = options(TABS.Past, TABBAR_ICONS.Past);
PlanningStack.navigationOptions = ({ navigation }: any) => {
  return {
    ...options(TABS.Planning, TABBAR_ICONS.Planning),
    tabBarVisible: navigation.state.index === 0
  };
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
      activeTintColor: theme.activeTint,
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
