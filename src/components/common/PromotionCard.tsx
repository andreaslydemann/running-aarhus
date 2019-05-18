import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import { View } from "react-native";
import PushableWrapper from "./PushableWrapper";

export default ({ run, navigateToDetails }: any) => {
  return (
    <PushableWrapper style={{ height: 300 }} onPress={navigateToDetails}>
      <Wrapper
        colors={["#ffb39d", "#ff43bb"]}
        start={[0.0, 0.25]}
        end={[0.5, 1.0]}
      >
        <BackgroundImage
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2014/04/03/10/50/run-311447_960_720.png"
          }}
        />
        <ContentWrapper>
          <View>
            <RunTitle>{run.title}</RunTitle>
          </View>
          <View>
            <Title large adjustsFontSizeToFit numberOfLines={1}>
              {run.meetingPoint}
            </Title>
            <Title>{run.startDateTime}</Title>
          </View>
        </ContentWrapper>
      </Wrapper>
    </PushableWrapper>
  );
};

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  flex: 1;
  margin: 10px 25px;
`;

interface TitleProps {
  large?: boolean;
}

const Title = styled.Text<TitleProps>`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 18 : 14)}px;
  align-self: flex-end;
`;

const RunTitle = styled(Title)`
  align-self: flex-start;
  font-size: 24px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  opacity: 0.2;
`;

const ContentWrapper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-between;
`;
