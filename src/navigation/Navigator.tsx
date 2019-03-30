import {
  AuthLoadingScreen,
  SignInScreen,
  ScheduleScreen,
  SettingsScreen
} from "screens";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const AppTabMenu = createBottomTabNavigator({
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
      App: AppTabMenu,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
