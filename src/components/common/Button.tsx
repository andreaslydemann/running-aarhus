import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "theme";

interface Props {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: string;
  style?: any;
  fontSize?: number;
  type?: string;
}
export default ({
  title,
  onPress,
  disabled = false,
  icon,
  style,
  fontSize = 20,
  type
}: Props) => (
  <TouchableWrapper
    style={style}
    onPress={onPress}
    shadow={theme.actionShadow}
    disabled={disabled}
  >
    <Wrapper colors={getColorsOfType(type)} start={[0.0, 0.0]} end={[1.0, 0.0]}>
      {icon && <Ionicons name={icon} size={25} color={theme.activeTint} />}
      {title && <Title fontSize={fontSize}>{title}</Title>}
    </Wrapper>
  </TouchableWrapper>
);

function getColorsOfType(type: string) {
  switch (type) {
    case "destructive":
      return theme.dangerGradient;
    case "submit":
      return theme.submitGradient;
    default:
      return theme.actionGradient;
  }
}

interface TouchableWrapperProps {
  shadow: string;
}

const TouchableWrapper = styled.TouchableOpacity<TouchableWrapperProps>`
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${({ shadow }) => shadow};
  shadow-offset: 0px 0px;
  margin: 0 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  ${({ disabled }) => disabled && "opacity: 0.3;"};
`;

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  padding: 15px 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

interface TitleProps {
  fontSize: number;
}

const Title = styled.Text<TitleProps>`
  color: ${({ theme }) => theme.activeTint};
  font-size: ${props => props.fontSize};
  font-weight: bold;
  margin-left: 10px;
  text-align: center;
`;
