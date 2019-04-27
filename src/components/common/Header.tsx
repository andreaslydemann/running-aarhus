import React from "react";
import { styled, theme } from "theme";
import { Ionicons } from "@expo/vector-icons";
import { THEME_PREFIX } from "theme";

interface Props {
  isModal?: boolean;
  ScreenTitle: string;
  navigateBack: () => void;
}

export default ({ ScreenTitle, navigateBack, isModal }: Props) => {
  const iconName = isModal
    ? `${THEME_PREFIX}-close`
    : `${THEME_PREFIX}-arrow-round-back`;

  return (
    <Wrapper>
      <IconWrapper onPress={navigateBack}>
        <Ionicons name={iconName} size={40} color={theme.activeTint} />
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
  color: ${({ theme }) => theme.activeTint};
  font-size: 20px;
  font-weight: bold;
  width: 60%;
  text-align: center;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
`;
