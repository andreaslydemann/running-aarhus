import { createStackNavigator, TabScene } from "react-navigation";
import { ScheduleScreen } from "screens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const ScheduleStack = createStackNavigator(
  { ScheduleScreen },
  {
    headerMode: "none"
  }
);

ScheduleStack.navigationOptions = {
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-list"} size={25} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-list"} size={25} color={tintColor} />
  )
};

export default ScheduleStack;
