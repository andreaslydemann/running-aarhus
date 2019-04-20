import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";

const TYPES = {
  primary: {
    gradient: ["#6b2afd", "#5e15ea"],
    shadow: "#5e15ea"
  },
  secondary: {
    gradient: ["#3a3a63", "#2c2f53"],
    shadow: "#2c2f53"
  },
  blue: {
    gradient: ["#6e90fe", "#5cd7cd"],
    shadow: "#6e90fe"
  },
  fire: {
    gradient: ["#ffec2a", "#fa53d6"],
    shadow: "#fa53d6"
  },
  red: {
    gradient: ["#FEB692", "#EA5455"],
    shadow: "#EA5455"
  }
};

interface Props {
  title?: string;
  onPress: () => void;
  type?: string;
  disabled?: boolean;
  icon?: string;
  style?: any;
  fontSize?: number;
}
export default ({
  title,
  onPress,
  type = "primary",
  disabled = false,
  icon,
  style,
  fontSize = 20
}: Props) => (
  <TouchableWrapper
    style={style}
    onPress={onPress}
    shadow={TYPES[type].shadow}
    disabled={disabled}
  >
    <Wrapper colors={TYPES[type].gradient} start={[0.0, 0.0]} end={[1.0, 0.0]}>
      {icon && <Ionicons name={icon} size={25} color="#efefef" />}
      {title && <Title fontSize={fontSize}>{title}</Title>}
    </Wrapper>
  </TouchableWrapper>
);

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
  color: #efefef;
  font-size: ${props => props.fontSize};
  font-weight: bold;
  margin-left: 10px;
  text-align: center;
`;
