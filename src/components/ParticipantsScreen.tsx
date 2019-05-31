import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { styled } from "../theme";
import { Header, ScreenBackground } from "./common";
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

    /* [
      Object {
        "creationDate": "2019-05-30T22:11:59.362Z",
        "firstName": "Andreas",
        "id": "j2ivAiBvx9ZJ1RqmrGQonHsqqVe2",
        "lastName": "Lüdemann",
        "pictureUrl": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10219042710328458&height=100&width=100&ext=1561846316&hash=AeS36LIDCUfdyNke",
      },
    ]*/

    return (
      <Wrapper>
        <Header
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("participantsTitle")}
          isModal={true}
        />

        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <FlatList
            data={participants}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 35
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
