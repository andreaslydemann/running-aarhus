import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { styled } from "../theme";
import { Header, InfoCard, ScreenBackground } from "./common";
import i18n from "i18n-js";
import { UserModel } from "types/models";
import moment from "moment";

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
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("participantsTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          {participants.length ? (
            <FlatList
              data={participants}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <ProfilePicture
                    source={{
                      uri: item.pictureUrl
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: 12
                    }}
                  >
                    <SectionTitle>
                      {item.firstName} {item.lastName}
                    </SectionTitle>
                    <InfoText>
                      User since{" "}
                      {moment(new Date(item.creationDate))
                        .format("LL")
                        .toLowerCase()}
                    </InfoText>
                  </View>
                </View>
              )}
            />
          ) : (
            <InfoCard
              title="No participants yet"
              subtitle="Sign up to this run"
              showTextOnly={true}
            />
          )}
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

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 16px;
`;

const ProfilePicture = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30;
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.inactiveTint};
  border-bottom-width: 1px;
  margin-vertical: 10px;
  width: 100%;
`;
