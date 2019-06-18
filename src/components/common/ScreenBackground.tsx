import React from "react";
import { LinearGradient } from "expo";
import { SafeAreaView } from "react-navigation";
import { theme } from "theme";

export default ({ children, style }: { children: any; style?: any }) => (
  <LinearGradient
    colors={[theme.darkShade, theme.darkAccent]}
    start={[0.0, 0.25]}
    end={[0.5, 1.0]}
    style={[style, { flex: 1 }]}
  >
    <SafeAreaView
      forceInset={{ top: "always", bottom: "never" }}
      style={{ flex: 1 }}
    >
      {children}
    </SafeAreaView>
  </LinearGradient>
);
