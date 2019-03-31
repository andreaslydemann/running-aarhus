import { createStackNavigator, TabScene } from "react-navigation";
import { SettingsScreen } from "screens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SettingsStack = createStackNavigator(
  { SettingsScreen },
  {
    headerMode: "none"
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: "settingsTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-options"} size={22} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-options"} size={22} color={tintColor} />
  )
};

export default SettingsStack;
