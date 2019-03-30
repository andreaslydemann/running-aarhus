import React, { Component } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";

interface Props {
  title: string;
  noBackgroundText?: boolean;
  style?: any;
}

export default class extends Component<Props> {
  state = {
    AppearAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.AppearAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad)
    }).start();
  }

  render() {
    const { title, noBackgroundText = false, style = {} } = this.props;
    const { AppearAnim } = this.state;
    const left = AppearAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 25]
    });
    const opacity = AppearAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3]
    });

    const BackgroundText = Animated.createAnimatedComponent(Text);

    return (
      <View style={[styles.container, style]}>
        {!noBackgroundText && (
          <BackgroundText
            style={[{ left, opacity }, styles.backgroundText]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {title}
          </BackgroundText>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 25,
    overflow: "visible",
    height: 80
  },
  backgroundText: {
    position: "absolute",
    marginLeft: 25,
    marginRight: 0,
    marginTop: -20,
    fontSize: 100,
    color: "#aaaaaa",
    fontWeight: "bold"
  },
  title: { fontSize: 30, color: "#eee", fontWeight: "bold", marginTop: 15 }
});
