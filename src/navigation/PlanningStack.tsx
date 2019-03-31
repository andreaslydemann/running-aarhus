import { createStackNavigator, TabScene } from "react-navigation";
import { PlanningScreen, RunDetails } from "screens";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PlanningStack = createStackNavigator(
  { PlanningScreen, RunDetails },
  {
    headerMode: "none"
  }
);

PlanningStack.navigationOptions = {
  tabBarLabel: "planningTitle",
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"ios-add-circle-outline"} size={22} color={tintColor} />
  ),
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name={"md-add-circle-outline"} size={22} color={tintColor} />
  )
};

export default PlanningStack;
