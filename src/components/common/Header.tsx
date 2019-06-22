import React from "react";
import { styled, theme } from "theme";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { THEME_PREFIX } from "theme";

interface Props {
  isModal?: boolean;
  showMoreButton?: boolean;
  onMoreButtonPress?: () => void;
  ScreenTitle: string;
  navigateBack: () => void;
}

export default ({
  ScreenTitle,
  navigateBack,
  isModal,
  showMoreButton,
  onMoreButtonPress
}: Props) => {
  const iconName = isModal
    ? `${THEME_PREFIX}-close`
    : `${THEME_PREFIX}-arrow-round-back`;

  return (
    <Wrapper>
      <IconWrapper onPress={navigateBack}>
        <Ionicons
          name={iconName}
          size={Platform.OS === "ios" ? 40 : 26}
          color={theme.activeTint}
        />
      </IconWrapper>
      <Title>{ScreenTitle}</Title>
      {showMoreButton && (
        <IconWrapper onPress={onMoreButtonPress}>
          <Ionicons
            name={`${THEME_PREFIX}-more`}
            size={26}
            color={theme.activeTint}
          />
        </IconWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 0px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 20px;
  font-weight: bold;
  width: 60%;
  text-align: center;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
  justify-content: center;
`;
