import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
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
        <View style={{ height: 49 }} />
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
              {renderIcon({ route, focused: isRouteActive, tintColor })}

              <Text style={{ color: tintColor, fontSize: 12 }}>
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    minHeight: 160
  },
  fakeBackground: {
    position: "absolute",
    width: "100%"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  tabStyle: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  tabButton: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default TabBar;
