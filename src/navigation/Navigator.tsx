import { AuthLoadingScreen, SignInScreen, ResultScreen } from "screens";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const AppStack = createStackNavigator(
  { Result: ResultScreen },
  {
    headerMode: "none"
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
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
