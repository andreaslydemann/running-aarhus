import React, { Component } from "react";
import { styled } from "theme";
import { ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-navigation";
import { HeaderBack, Button, ScreenBackground } from "components/common";

interface Props {
  navigation: { goBack: () => void };
}

export default class extends Component<Props> {
  openMap({ longitude, latitude }: { longitude: number; latitude: number }) {
    console.log(longitude, latitude);
  }

  render() {
    const run = {
      name: "Intervaller Lørdag",
      date: Date.now(),
      duration: { hours: 1, minutes: 40 },
      location: "Ceres Park",
      planner: "Anders Andersen",
      description:
        "Vi løber 6x4 minutters intervaller på løbebanen. Opvarmning er på et kvarter."
    };

    const location = { longitude: 0, latitude: 0 };

    return (
      <Wrapper>
        <ContentWrapper>
          <HeaderBack
            ScreenTitle={run.name}
            navigateBack={() => this.props.navigation.goBack()}
          />
          <ScrollView>
            <DetailsWrapper>
              <SectionTitle>Date</SectionTitle>
              <InfoText>{run.date}</InfoText>
              <SectionTitle>Duration</SectionTitle>
              <InfoText>
                {run.duration.hours} hours, {run.duration.minutes} minutes
              </InfoText>
              <SectionTitle>Location</SectionTitle>
              <InfoText>{run.location}</InfoText>
              <SectionTitle>Planner</SectionTitle>
              <InfoText>{run.planner}</InfoText>
            </DetailsWrapper>
            <DescText>{run.description}</DescText>

            <LinksWrapper>
              <Row>
                <ButtonWrapper>
                  <LinkButton
                    icon={Platform.OS === "ios" ? "ios-map" : "md-map"}
                    type="blue"
                    onPress={() => this.openMap(location)}
                  />
                  <ButtonLabel>Location</ButtonLabel>
                </ButtonWrapper>
              </Row>
            </LinksWrapper>
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
  color: white;
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const DescText = styled.Text`
  color: white;
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
