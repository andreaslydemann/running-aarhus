import { createStackNavigator, createAppContainer } from "react-navigation";
import { LoginScreen, ResultScreen } from "screens";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const RootStack = createStackNavigator(
  { LoginScreen, ResultScreen },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none"
  }
);

const Navigator = createAppContainer(RootStack);

export default Navigator;
