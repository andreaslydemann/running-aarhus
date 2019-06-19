import React, { PureComponent } from "react";
import { Animated } from "react-native";
import { styled, theme, THEME_PREFIX } from "theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  text?: string;
  isVisible: boolean;
  height: number;
  width: number;
  textNumberOfLines: number;
  showAsOverlay: boolean;
  type: string;
  style: object;
}

export const statusModalTypes = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export class StatusModal extends PureComponent<Props, any> {
  static defaultProps = {
    height: 100,
    width: 100,
    textNumberOfLines: 1,
    isVisible: true,
    showAsOverlay: false,
    style: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  fadeInAnimation() {
    return Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 400
    });
  }

  fadeOutAnimation() {
    return Animated.timing(this.state.fadeAnim, {
      toValue: 2,
      duration: 400
    });
  }

  renderIcon() {
    switch (this.props.type) {
      case statusModalTypes.LOADING:
        return <Spinner color={theme.activeTint} size={"large"} />;
      case statusModalTypes.SUCCESS:
        return (
          <Ionicons
            name={`${THEME_PREFIX}-checkmark`}
            size={76}
            color={theme.activeTint}
          />
        );
      case statusModalTypes.ERROR:
        return (
          <Ionicons
            name={`${THEME_PREFIX}-close`}
            size={76}
            color={theme.activeTint}
          />
        );
      default:
        return null;
    }
  }

  animateLoading() {
    const isAnimating = this.state.fadeAnim.__getValue() !== 0;

    if (this.props.isVisible && !isAnimating) {
      this.fadeInAnimation().start();
    } else if (isAnimating) {
      this.fadeOutAnimation().start(() => {
        this.state.fadeAnim.setValue(0);
      });
    }
  }

  animateSuccessOrError() {
    if (!this.props.isVisible) return;

    Animated.sequence([
      this.fadeInAnimation(),
      Animated.delay(1000),
      this.fadeOutAnimation()
    ]).start();
  }

  render() {
    const {
      type,
      text,
      textNumberOfLines,
      height,
      width,
      showAsOverlay,
      isVisible,
      style
    } = this.props;
    const isLoadingModal = type === statusModalTypes.LOADING;
    const shouldBlockInputs = isLoadingModal && isVisible && showAsOverlay;

    isLoadingModal ? this.animateLoading() : this.animateSuccessOrError();

    const containerStyle = {
      backgroundColor: "transparent",
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
        style={[animatedStyle, containerStyle, style]}
        pointerEvents={shouldBlockInputs ? undefined : "none"}
      >
        <Wrapper height={height} width={width}>
          {this.renderIcon()}
          {text && (
            <StyledText numberOfLines={textNumberOfLines}>{text}</StyledText>
          )}
        </Wrapper>
      </Animated.View>
    );
  }
}

interface WrapperProps {
  height: number;
  width: number;
}

const Wrapper = styled.View<WrapperProps>`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-color: ${({ theme }) => theme.darkAccent};
  border-width: 1px;
`;

const StyledText = styled.Text`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.activeTint};
  font-size: 14px;
`;

const Spinner = styled.ActivityIndicator`
  margin: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
