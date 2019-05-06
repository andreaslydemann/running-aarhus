import React, { Component } from "react";
import { styled, theme, THEME_PREFIX } from "theme";
import { Image, View } from "react-native";
import { Header, Button, ScreenBackground } from "components/common";
import { Ionicons } from "@expo/vector-icons";

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
      description:
        "This is a great run and its a great run and its a great run and its a great run and its a great run and its a great run.",
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
        <Header
          ScreenTitle={run.title}
          navigateBack={() => this.props.navigation.goBack()}
        />
        <ScrollWrapper contentContainerStyle={{ paddingVertical: 30 }}>
          <DetailsWrapper>
            <BottomMargin>
              <SectionTitle>Date</SectionTitle>
              <InfoText>{run.startDateTime}</InfoText>
            </BottomMargin>
            <BottomMargin>
              <SectionTitle>Distance</SectionTitle>
              <InfoText>{run.distance} km</InfoText>
            </BottomMargin>
            {run.pace && (
              <BottomMargin>
                <SectionTitle>Pace</SectionTitle>
                <InfoText>{run.pace} min/km</InfoText>
              </BottomMargin>
            )}
            <SectionTitle>Meeting point</SectionTitle>
            <InfoText>{run.meetingPoint}</InfoText>
          </DetailsWrapper>

          <Icon
            name={`${THEME_PREFIX}-walk`}
            size={40}
            color={theme.activeTint}
          />

          {run.description ? <DescText>{run.description}</DescText> : null}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 35
            }}
          >
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
              <SectionTitle>Arrangør:</SectionTitle>
              <InfoText>Anders Andersen</InfoText>
            </View>
          </View>

          <Row>
            <ButtonWrapper>
              <LinkButton
                icon={`${THEME_PREFIX}-people`}
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

          <ButtonWrapper>
            <LinkButton title="Join" onPress={() => this.openMap(location)} />
          </ButtonWrapper>
        </ScrollWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  padding: 44px 0 0 0;
  flex: 1;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 0 20px;
`;

const DetailsWrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  flex: 1;
  justify-content: flex-end;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-size: 16px;
`;

const DescText = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  text-align: justify;
  margin-horizontal: 5px;
  margin-bottom: 35px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LinkButton = styled(Button)`
  width: 100%;
`;

const ButtonLabel = styled.Text`
  color: ${({ theme }) => theme.inactiveTint};
  margin: 3px;
`;

const ButtonWrapper = styled.View`
  flex: 0.47;
  align-items: center;
`;

const BottomMargin = styled.View`
  margin-bottom: 18px;
`;

const Icon = styled(Ionicons)`
  align-self: center;
  margin-vertical: 20px;
`;
