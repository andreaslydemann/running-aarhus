import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "types/common";
import i18n from "i18n-js";

interface Props {
  onLeftItemPress: () => void;
  onMiddleItemPress: () => void;
  onRightItemPress: () => void;
  selectedItem: Item;
}

export default class extends Component<Props> {
  handleOuterPress(item: Item) {
    switch (item) {
      case Item.Left:
        this.props.onLeftItemPress();
        return;
      case Item.Right:
        this.props.onRightItemPress();
        return;
    }
  }

  render() {
    return (
      <Wrapper>
        <OuterItem onPress={() => this.handleOuterPress(Item.Left)}>
          <ItemText isSelected={this.props.selectedItem === Item.Left}>
            {i18n.t("allRuns").toUpperCase()}
          </ItemText>
        </OuterItem>
        <MiddleItem onPress={this.props.onMiddleItemPress}>
          <IconWrapper>
            <Icon
              name={`${THEME_PREFIX}-add-circle-outline`}
              color={theme.activeTint}
              size={36}
            />
          </IconWrapper>
        </MiddleItem>
        <OuterItem onPress={() => this.handleOuterPress(Item.Right)}>
          <ItemText isSelected={this.props.selectedItem === Item.Right}>
            {i18n.t("myRuns").toUpperCase()}
          </ItemText>
        </OuterItem>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
`;

const OuterItem = styled.TouchableOpacity`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

const MiddleItem = styled.TouchableOpacity`
  flex: 0.2;
`;

const IconWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(Ionicons)`
  padding: 3px 0 2px 0;
`;

interface ItemTextProps {
  isSelected: boolean;
}

const ItemText = styled.Text<ItemTextProps>`
  font-size: 14px;
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  color: ${props => (props.isSelected ? theme.action : theme.activeTint)};
`;
