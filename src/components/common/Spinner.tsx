import React, { PureComponent } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Indicator } from "./Indicator";
import { theme, styled } from "theme";

interface Props {
  color: string;
  size: number;
  minScale: number;
  maxScale: number;
  animationDuration: number;
}

export default class extends PureComponent<Props> {
  static defaultProps = {
    animationDuration: 1600,
    color: theme.activeTint,
    count: 5,
    size: 50,
    minScale: 0.2,
    maxScale: 1.0
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: any) {
    const {
      size,
      minScale,
      maxScale,
      color: backgroundColor,
      animationDuration
    } = this.props;

    const frames = (60 * animationDuration) / 1000;
    const offset = index / (count - 1);
    const easing = Easing.bezier(0.5, offset, 0.5, 1.0);

    const inputRange = Array.from(
      new Array(frames),
      // @ts-ignore
      (undefined: any, index: number) => index / (frames - 1)
    );

    const outputRange = Array.from(
      new Array(frames),
      // @ts-ignore
      (undefined, index) => easing(index / (frames - 1)) * 360 + "deg"
    );

    const layerStyle = {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-start",
      alignItems: "center",
      transform: [
        {
          rotate: progress.interpolate({ inputRange, outputRange })
        }
      ]
    };

    const ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              maxScale - (maxScale - minScale) * offset,
              minScale + (maxScale - minScale) * offset
            ]
          })
        }
      ]
    };

    return (
      <Animated.View style={layerStyle} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  }

  render() {
    let { size: width, size: height, ...props } = this.props;

    return (
      <Wrapper>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
