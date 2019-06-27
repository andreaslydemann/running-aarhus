import React from "react";
import { styled, theme } from "theme";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { THEME_PREFIX } from "theme";
import Text from "./Text";

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

  const isAndroid = Platform.OS === "android";

  return (
    <Wrapper isAndroid={isAndroid}>
      <IconWrapper onPress={navigateBack}>
        <Ionicons
          name={iconName}
          size={isAndroid ? 26 : 40}
          color={theme.activeTint}
        />
      </IconWrapper>
      <Title numberOfLines={1}>{ScreenTitle}</Title>
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

interface WrapperProps {
  isAndroid: boolean;
}

const Wrapper = styled.View<WrapperProps>`
  align-items: center;
  flex-direction: row;
  margin-top: ${props => (props.isAndroid ? "14px" : "0px")};
  margin-bottom: ${props => (props.isAndroid ? "14px" : "6px")};
`;

const Title = styled(Text)`
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
