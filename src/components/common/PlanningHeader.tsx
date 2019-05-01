import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onLeftItemPress: () => void;
  onMiddleItemPress: () => void;
  onRightItemPress: () => void;
}

interface State {
  selectedItem?: Item;
}

enum Item {
  Left,
  Right
}

export default class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedItem: Item.Left
    };
  }

  handleOuterPress(item: Item) {
    this.setState({ selectedItem: item });

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
          <ItemText isSelected={this.state.selectedItem === Item.Left}>
            All runs
          </ItemText>
        </OuterItem>
        <MiddleItem onPress={this.props.onMiddleItemPress}>
          <Icon
            name={`${THEME_PREFIX}-add-circle-outline`}
            size={30}
            color={theme.activeTint}
          />
        </MiddleItem>
        <OuterItem onPress={() => this.handleOuterPress(Item.Right)}>
          <ItemText isSelected={this.state.selectedItem === Item.Right}>
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

interface ItemTextProps {
  isSelected: boolean;
}

const ItemText = styled.Text<ItemTextProps>`
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  color: ${props => (props.isSelected ? theme.action : theme.activeTint)};
`;
