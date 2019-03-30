import React from "react";
import { LinearGradient } from "expo";

export default ({ children, style }: { children: any; style?: any }) => (
  <LinearGradient
    colors={["#04381C", "#002310"]}
    start={[0.0, 0.25]}
    end={[0.5, 1.0]}
    style={style}
  >
    {children}
  </LinearGradient>
);
