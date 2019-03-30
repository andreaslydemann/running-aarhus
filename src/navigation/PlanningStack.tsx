import { createStackNavigator, TabScene } from "react-navigation";
import { PlanningScreen } from "screens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PlanningStack = createStackNavigator(
  { PlanningScreen },
  {
    headerMode: "none"
  }
);

PlanningStack.navigationOptions = {
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-add-circle-outline"} size={25} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-add-circle-outline"} size={25} color={tintColor} />
  )
};

export default PlanningStack;
