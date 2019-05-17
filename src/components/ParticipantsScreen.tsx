import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { styled } from "../theme";
import { Header, ScreenBackground } from "./common";
import i18n from "i18n-js";

interface PropsConnectedState {
  participants: any;
}

interface Props extends PropsConnectedState {
  navigation: {
    goBack: (nullArg?: null) => void;
  };
}

export default class ParticipantsScreen extends Component<Props> {
  render() {
    const participants = [
      {
        id: "1",
        name: "Anders"
      },
      {
        id: "2",
        name: "Karsten"
      }
    ];

    return (
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("createRunTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <FlatList
            data={participants}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </ScrollWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;
