import { createStackNavigator, createAppContainer } from "react-navigation";
import { AuthScreen, ResultScreen } from "screens";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const RootStack = createStackNavigator(
  { AuthScreen, ResultScreen },
  {
    initialRouteName: "AuthScreen",
    headerMode: "none"
  }
);

const Navigator = createAppContainer(RootStack);

export default Navigator;
