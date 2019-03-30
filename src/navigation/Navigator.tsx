import { createStackNavigator, createAppContainer } from "react-navigation";
import { SignInScreen, ResultScreen } from "screens";

// https://github.com/janhesters/ReactNative-ComplexNavigation/blob/master/app/navigation/Navigator.tsx
const RootStack = createStackNavigator(
  { SignInScreen, ResultScreen },
  {
    initialRouteName: "SignInScreen",
    headerMode: "none"
  }
);

const Navigator = createAppContainer(RootStack);

export default Navigator;
