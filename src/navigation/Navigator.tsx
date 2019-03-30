import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  AuthLoadingScreen,
  SignInScreen,
  ScheduleScreen,
  SettingsScreen
} from "screens";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const AppTabBar = createBottomTabNavigator({
  Schedule: ScheduleScreen,
  Settings: SettingsScreen
});

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
