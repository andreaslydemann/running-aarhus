import React, { Component } from "react";
import { styled, theme } from "theme";
import { Animated, View, Easing, ActivityIndicator } from "react-native";
import Text from "./Text";
import Button from "./Button";

interface Props {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  onPress?: () => void;
  loading?: boolean;
}

export default class extends Component<Props> {
  state = {
    appearAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.quad)
    }).start();
  }

  render() {
    const {
      title,
      subtitle,
      onPress,
      loading,
      showButton,
      buttonText
    } = this.props;
    const { appearAnim } = this.state;

    return (
      <Wrapper
        style={{
          opacity: appearAnim,
          transform: [
            {
              translateY: this.state.appearAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 0]
              })
            }
          ]
        }}
      >
        <Title>{title}</Title>

        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        {showButton && (
          <ButtonWrapper>
            {loading ? (
              <ActivityIndicator color={theme.activeTint} size="large" />
            ) : (
              <Button title={buttonText} onPress={onPress} disabled={loading} />
            )}
          </ButtonWrapper>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 15px
  align-items: center;
  padding: 13px;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
  font-size: 20px;
  margin: 15px 0 10px 0;
`;

const Subtitle = styled(Text)`
  color: ${({ theme }) => theme.inactiveTint};
  font-size: 16px;
  margin: 10px 0 15px 0;
`;

const ButtonWrapper = styled.View`
  margin-vertical: 15px;
  height: 60px;
  justify-content: center;
`;
