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
import { AuthLoadingScreen, SignInScreen } from "screens";
import { theme } from "theme";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const AppTabBar = createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Planning: PlanningStack,
    Past: PastStack,
    Settings: SettingsStack
  },
  {
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

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppTabBar,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
