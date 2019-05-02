import React from "react";
import { Animated } from "react-native";
import { styled, theme } from "theme";

interface Props {
  text?: string;
  textNumberOfLines: number;
  isVisible: boolean;
  showAsOverlay: boolean;
}

export default class extends React.Component<Props, any> {
  static defaultProps = {
    textNumberOfLines: 1,
    isVisible: true,
    showAsOverlay: false
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  fadeInAnimation() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 400
    }).start();
  }

  fadeOutAnimation() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 2,
      duration: 400
    }).start(() => {
      this.state.fadeAnim.setValue(0);
    });
  }

  render() {
    if (this.props.isVisible) {
      //
      if (this.state.fadeAnim.__getValue() === 0) {
        this.fadeInAnimation();
      }
    } else if (this.state.fadeAnim.__getValue() === 1) {
      this.fadeOutAnimation();
    }

    const containerStyle = {
      backgroundColor: this.props.showAsOverlay
        ? "rgba(0,0,0,0.3)"
        : "transparent",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1
    };

    const animatedStyle = {
      transform: [
        {
          scale: this.state.fadeAnim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1.25, 1, 0.75]
          })
        }
      ],
      opacity: this.state.fadeAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0]
      })
    };

    return (
      <Animated.View
        style={[animatedStyle, containerStyle]}
        pointerEvents="none"
      >
        <Wrapper>
          <Spinner color={theme.activeTint} size={"large"} />
          {this.props.text && (
            <StyledText numberOfLines={this.props.textNumberOfLines}>
              {this.props.text}
            </StyledText>
          )}
        </Wrapper>
      </Animated.View>
    );
  }
}

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  width: 100;
  height: 100;
`;

const StyledText = styled.Text`
  margin-top: 8px;
  color: ${({ theme }) => theme.activeTint};
  font-size: 14px;
`;

const Spinner = styled.ActivityIndicator`
  margin: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
