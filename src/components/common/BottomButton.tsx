import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";

const TYPES = {
  primary: {
    gradient: ["#1481BA", "#0F5E88"],
    shadow: "#0e3d5b"
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
  title: string;
  onPress: () => void;
  type?: string;
  disabled?: boolean;
  style?: any;
}

export default ({
  title,
  onPress,
  type = "primary",
  disabled = false,
  style
}: Props) => (
  <TouchableWrapper
    style={style}
    onPress={onPress}
    shadow={TYPES[type].shadow}
    disabled={disabled}
  >
    <Wrapper colors={TYPES[type].gradient} start={[0.0, 0.0]} end={[1.0, 0.0]}>
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
  color: #efefef;
  margin-bottom: 20px;
  font-size: 22;
  font-weight: bold;
  margin-left: 10px;
  text-align: center;
`;
