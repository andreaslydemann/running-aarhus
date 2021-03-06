import React, { Component } from "react";
import { FlatList } from "react-native";
import { styled } from "../theme";
import { Header, InfoCard, ProfileInfo, ScreenBackground } from "./common";
import i18n from "i18n-js";
import { UserModel } from "types/models";

interface Props {
  navigation: {
    goBack: (nullArg?: null) => void;
    getParam: (param: string) => any;
  };
}

export default class ParticipantsScreen extends Component<Props> {
  render() {
    const participants = this.props.navigation.getParam(
      "participants"
    ) as UserModel[];

    return (
      <ScreenBackground>
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("participantsTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 20 }}>
          {participants.length ? (
            <FlatList
              data={participants}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => <ProfileInfo user={item} />}
            />
          ) : (
            <InfoCard
              title={i18n.t("missingParticipantsTitle")}
              subtitle={i18n.t("missingParticipantsSubtitle")}
            />
          )}
        </ScrollWrapper>
      </ScreenBackground>
    );
  }
}

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.dimmedTint};
  border-bottom-width: 1px;
  margin-vertical: 10px;
  width: 100%;
`;
