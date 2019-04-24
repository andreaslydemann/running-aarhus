import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import { theme } from "theme";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

export default ({ title, onPress, disabled = false, style }: Props) => (
  <TouchableWrapper
    style={style}
    onPress={onPress}
    shadow={theme.actionShadow}
    disabled={disabled}
  >
    <Wrapper colors={theme.actionGradient} start={[0.0, 0.0]} end={[1.0, 0.0]}>
      {title && <Title>{title}</Title>}
    </Wrapper>
  </TouchableWrapper>
);

interface TouchableWrapperProps {
  shadow: string;
}

const TouchableWrapper = styled.TouchableOpacity<TouchableWrapperProps>`
  background: ${({ theme }) => theme.primary};
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${({ shadow }) => shadow};
  shadow-offset: 0px 0px;
  ${({ disabled }) => disabled && "opacity: 0.3;"};
`;

const Wrapper = styled(LinearGradient)`
  height: 84;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  margin-bottom: 20px;
  font-size: 22;
  font-weight: bold;
  margin-left: 10px;
  text-align: center;
`;
