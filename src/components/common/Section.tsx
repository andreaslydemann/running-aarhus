import React from "react";
import { styled } from "theme";
import { TouchableOpacity } from "react-native";

interface ButtonProps {
  top?: boolean;
  bottom?: boolean;
  disabled?: boolean;
  touchable?: boolean;
  onPress?: () => void;
  children?: Element | Element[];
  style?: any;
}

export default ({
  top,
  bottom,
  disabled = false,
  touchable = false,
  children,
  onPress,
  style
}: ButtonProps) => {
  const renderContent = () => {
    return (
      <Content top={top} bottom={bottom} disabled={disabled} style={style}>
        {children}
      </Content>
    );
  };

  return touchable ? (
    <TouchableOpacity onPress={onPress}>{renderContent()}</TouchableOpacity>
  ) : (
    renderContent()
  );
};

const Content = styled.View<ButtonProps>`
  background: ${({ theme }) => theme.primary};
  min-height: 70;
  padding: 20px;
  ${props =>
    props.top &&
    `
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
    `} ${props =>
    props.bottom &&
    `
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    `} margin-top: 3px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${props => props.disabled && `opacity: 0.3;`};
`;
