import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "types/common";

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
            All runs
          </ItemText>
        </OuterItem>
        <MiddleItem onPress={this.props.onMiddleItemPress}>
          <Icon
            name={`${THEME_PREFIX}-add-circle-outline`}
            size={36}
            color={theme.activeTint}
          />
        </MiddleItem>
        <OuterItem onPress={() => this.handleOuterPress(Item.Right)}>
          <ItemText isSelected={this.props.selectedItem === Item.Right}>
            My runs
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
  align-items: center;
`;

const Icon = styled(Ionicons)`
  margin-top: 4px;
`;

interface ItemTextProps {
  isSelected: boolean;
}

const ItemText = styled.Text<ItemTextProps>`
  font-size: 16px;
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  color: ${props => (props.isSelected ? theme.action : theme.activeTint)};
`;
