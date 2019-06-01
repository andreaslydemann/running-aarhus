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
  SetRunScreen,
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

const SeeScheduleStack = createStackNavigator(
  { ScheduleScreen, RunDetailsStack },
  { headerMode: "none" }
);

const FindRunStack = createStackNavigator(
  { PlanningScreen, RunDetailsStack },
  { headerMode: "none" }
);

const SetRunStack = createStackNavigator(
  { SetRunScreen, SetRouteScreen },
  { headerMode: "none" }
);

const ScheduleStack = createStackNavigator(
  { SeeSchedule: SeeScheduleStack, EditRun: SetRunStack },
  { headerMode: "none", mode: "modal" }
);

const PlanningStack = createStackNavigator(
  {
    FindRun: FindRunStack,
    CreateRun: SetRunStack
  },
  { headerMode: "none", mode: "modal" }
);

const PastStack = createStackNavigator(
  { PastScreen, RunDetailsStack },
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

ScheduleStack.navigationOptions = ({ navigation }: any) => {
  return {
    ...options(TABS.Schedule, TABBAR_ICONS.Schedule),
    tabBarVisible: navigation.state.index === 0
  };
};
PlanningStack.navigationOptions = ({ navigation }: any) => {
  return {
    ...options(TABS.Planning, TABBAR_ICONS.Planning),
    tabBarVisible: navigation.state.index === 0
  };
};
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
