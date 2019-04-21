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
      <BackArrowWrapper onPress={navigateBack}>
        <Ionicons name={iconName} size={40} color="white" />
      </BackArrowWrapper>
      <Title>{ScreenTitle}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 50%;
  text-align: center;
`;

const BackArrowWrapper = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
`;
