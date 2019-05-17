import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Animated, View, Easing, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface Props {
  title: string;
  subtitle: string;
  showTextOnly?: boolean;
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
    const { title, subtitle, onPress, loading, showTextOnly } = this.props;
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
        {!showTextOnly && (
          <Ionicons
            name={`${THEME_PREFIX}-information-circle-outline`}
            size={40}
            color="white"
          />
        )}

        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        {!showTextOnly && (
          <ButtonWrapper>
            {loading ? (
              <ActivityIndicator color={theme.activeTint} size="large" />
            ) : (
              <Button title="Retry" onPress={onPress} disabled={loading} />
            )}
          </ButtonWrapper>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Animated.createAnimatedComponent(View))`
    background-color: ${({ theme }) => theme.primary};
    margin: 25px;
    border-radius: 20px
    align-items: center;
    padding: 20px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
  font-size: 22px;
  margin: 20px 0 10px 0;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
  margin: 10px 0 20px 0;
`;

const ButtonWrapper = styled.View`
  height: 60px;
  justify-content: center;
`;
