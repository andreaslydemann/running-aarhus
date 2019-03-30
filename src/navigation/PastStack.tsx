import { createStackNavigator, TabScene } from "react-navigation";
import { PastScreen } from "screens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PastStack = createStackNavigator(
  { PastScreen },
  {
    headerMode: "none"
  }
);

PastStack.navigationOptions = {
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons
      name={"ios-checkmark-circle-outline"}
      size={25}
      color={tintColor}
    />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons
      name={"md-checkmark-circle-outline"}
      size={25}
      color={tintColor}
    />
  )
};

export default PastStack;
