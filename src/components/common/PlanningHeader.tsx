import { styled, theme, THEME_PREFIX } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface Props {
  onLeftItemPress?: () => void;
  onMiddleItemPress?: () => void;
  onRightItemPress?: () => void;
}

export default ({
  onLeftItemPress,
  onMiddleItemPress,
  onRightItemPress
}: Props) => {
  return (
    <Wrapper>
      <OuterItem onPress={onLeftItemPress}>
        <ItemText>All runs</ItemText>
      </OuterItem>
      <MiddleItem onPress={onMiddleItemPress}>
        <Icon
          name={`${THEME_PREFIX}-add-circle-outline`}
          size={30}
          color={theme.activeTint}
        />
      </MiddleItem>
      <OuterItem onPress={onRightItemPress}>
        <ItemText>My runs</ItemText>
      </OuterItem>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
  margin: 20px 20px 0 20px;
  border-radius: 15px;
`;

const OuterItem = styled.TouchableOpacity`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

const MiddleItem = styled.TouchableOpacity`
  flex: 0.2;
  align-items: center;
`;

const Icon = styled(Ionicons)`
  margin-top: 3px;
`;

const ItemText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
`;
