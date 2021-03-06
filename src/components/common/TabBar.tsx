import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import Text from "./Text";
import i18n from "i18n-js";

const TabBar = ({
  style,
  navigation,
  activeTintColor,
  inactiveTintColor,
  renderIcon,
  getLabelText,
  onTabPress,
  onTabLongPress
}: any) => {
  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={styles.container}
      forceInset={{
        top: "never",
        bottom: "always"
      }}
    >
      <SafeAreaView
        style={[styles.fakeBackground, style]}
        forceInset={{
          top: "never",
          bottom: "always"
        }}
      >
        <View style={{ height: 50 }} />
      </SafeAreaView>
      <View pointerEvents="box-none" style={styles.content}>
        {routes.map((route: any, routeIndex: any) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              key={routeIndex}
              style={styles.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
            >
              <View style={{ height: 24 }}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
              </View>

              <Text style={{ color: tintColor, fontSize: 10 }}>
                {i18n.t(getLabelText({ route }))}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    height: 50
  },
  fakeBackground: {
    position: "absolute",
    width: "100%"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  tabStyle: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TabBar;
