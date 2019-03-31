import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  ScheduleStack,
  PlanningStack,
  PastStack,
  SettingsStack
} from "navigation";
import { SignInScreen } from "screens";
import TabBar from "components/TabBar";
import { theme } from "theme";
import React, { Component } from "react";

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
    const AppNavigator = createAppContainer(
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

    return <AppNavigator />;
  }
}
