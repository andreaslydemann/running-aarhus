import React from "react";
import { Platform } from "react-native";
import { styled } from "theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isModal?: boolean;
  ScreenTitle: string;
  navigateBack: () => void;
}

export default ({ ScreenTitle, navigateBack, isModal }: Props) => {
  const iconTheme = Platform.OS === "ios" ? "ios" : "md";

  const iconName = isModal
    ? `${iconTheme}-close`
    : `${iconTheme}-arrow-round-back`;

  return (
    <Wrapper>
      <IconWrapper onPress={navigateBack}>
        <Ionicons name={iconName} size={40} color="white" />
      </IconWrapper>
      <Title>{ScreenTitle}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 0px;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 50%;
  text-align: center;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
`;
