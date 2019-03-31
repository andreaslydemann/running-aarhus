import React from "react";
import { Platform } from "react-native";
import { styled } from "theme";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled.View`
  width: 100%;
  height: 60px;
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

interface Props {
  ScreenTitle: string;
  navigateBack: () => void;
}

export default ({ ScreenTitle, navigateBack }: Props) => {
  return (
    <Wrapper>
      <BackArrowWrapper onPress={navigateBack}>
        <Ionicons
          name={
            Platform.OS === "ios"
              ? "ios-arrow-round-back"
              : "md-arrow-round-back"
          }
          size={40}
          color="white"
        />
      </BackArrowWrapper>
      <Title>{ScreenTitle}</Title>
    </Wrapper>
  );
};
