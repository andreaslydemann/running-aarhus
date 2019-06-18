import React, { Component } from "react";
import { Animated, Easing, Text } from "react-native";
import { styled } from "theme";

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

    return (
      <Wrapper style={style}>
        {!noBackgroundText && (
          <BackgroundText
            style={{ left, opacity }}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {title}
          </BackgroundText>
        )}
        <MainText>{title}</MainText>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  padding-horizontal: 20px;
  overflow: visible;
  height: 80px;
`;

const MainText = styled.Text`
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  margin-top: 15px;
`;

const BackgroundText = styled(Animated.createAnimatedComponent(Text))`
  position: absolute;
  left: 25px;
  right: 0;
  top: -20px;
  font-size: 100px;
  color: #77a6b0;
  font-weight: bold;
`;
