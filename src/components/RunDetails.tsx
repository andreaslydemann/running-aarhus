import React, { Component } from "react";
import { styled, theme } from "theme";
import { Image, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Header, Button, ScreenBackground } from "components/common";
import { THEME_PREFIX } from "theme";

interface Props {
  navigation: { goBack: () => void };
}

export default class extends Component<Props> {
  openMap({ longitude, latitude }: { longitude: number; latitude: number }) {
    console.log(longitude, latitude);
  }

  render() {
    const run = {
      cancelled: false,
      coordinates: [
        {
          _latitude: 56.16199992705801,
          _longitude: 10.161590916784867
        },
        {
          _latitude: 56.15512769268152,
          _longitude: 10.17518802706289
        },
        {
          _latitude: 56.14233442757844,
          _longitude: 10.157020454889446
        },
        {
          _latitude: 56.127690141706736,
          _longitude: 10.17290280134564
        }
      ],
      description: "Fkf",
      distance: 5.99,
      endDateTime: "01.30",
      id: "2L1iuE5xLLP1TuIHedoW",
      meetingPoint: "30 Åbyhøjvej, Åbyhøj, 8210",
      pace: 6,
      startDateTime: "2019-05-27T22:00:00.000Z",
      title: "Fjjrg",
      userId: "j2ivAiBvx9ZJ1RqmrGQonHsqqVe2"
    };

    const location = { longitude: 0, latitude: 0 };

    return (
      <Wrapper>
        <ContentWrapper>
          <Header
            ScreenTitle={run.title}
            navigateBack={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <DetailsWrapper>
              <SectionTitle>Date</SectionTitle>
              <InfoText>{run.startDateTime}</InfoText>
              <SectionTitle>Distance</SectionTitle>
              <InfoText>{run.distance} km</InfoText>
              <SectionTitle>Pace</SectionTitle>
              <InfoText>{run.pace} min/km</InfoText>
              <SectionTitle>Meeting point</SectionTitle>
              <InfoText>{run.meetingPoint}</InfoText>
            </DetailsWrapper>

            <DescText>{run.description}</DescText>

            <View style={{ margin: 25 }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  color: theme.activeTint
                }}
              >
                Arrangeret af:
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ height: 60, width: 60 }}
                  source={require("../../assets/logo.png")}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 5
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: theme.activeTint
                    }}
                  >
                    Anders Andersen
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.inactiveTint
                    }}
                  >
                    Medlem siden maj 2017
                  </Text>
                </View>
              </View>
            </View>

            <LinksWrapper>
              <Row>
                <ButtonWrapper>
                  <LinkButton
                    icon={`${THEME_PREFIX}-map`}
                    onPress={() => this.openMap(location)}
                  />
                  <ButtonLabel>Participants</ButtonLabel>
                </ButtonWrapper>
                <ButtonWrapper>
                  <LinkButton
                    icon={`${THEME_PREFIX}-map`}
                    onPress={() => this.openMap(location)}
                  />
                  <ButtonLabel>Location</ButtonLabel>
                </ButtonWrapper>
              </Row>
            </LinksWrapper>

            <ButtonWrapper>
              <LinkButton title="Join" onPress={() => this.openMap(location)} />
            </ButtonWrapper>
          </ScrollView>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const DetailsWrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  margin: 25px;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
  justify-content: flex-end;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const DescText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  text-align: justify;
  margin: 25px;
`;

const LinksWrapper = styled.View`
  margin: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LinkButton = styled(Button)`
  width: 80%;
`;

const ButtonLabel = styled.Text`
  color: #bbb;
  margin: 3px;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  align-items: center;
`;
