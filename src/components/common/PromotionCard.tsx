import React from "react";
import { View } from "react-native";
import { styled } from "theme";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { getLanguage } from "utils";

export default ({ data }: { data: any }) => {
  const { startDateTime, endDateTime, meetingPoint, title } = data;

  const startDateTimeMoment = moment(new Date(startDateTime)).locale(
    getLanguage()
  );
  const startDate = startDateTimeMoment.format("LL");
  const startTime = startDateTimeMoment.format("LT");
  const endTime = endDateTime
    ? moment(new Date(endDateTime))
        .locale(getLanguage())
        .format("LT")
    : null;

  return (
    <Wrapper
      colors={["#54A3CC", "#1481BA"]}
      start={[0.0, 0.25]}
      end={[0.5, 1.0]}
    >
      <ContentWrapper>
        <RunTitle>{title}</RunTitle>
        <ImageWrapper>
          <BackgroundImage source={require("../../../assets/runner.png")} />
        </ImageWrapper>
        <View>
          <Text large adjustsFontSizeToFit numberOfLines={1}>
            {meetingPoint}
          </Text>
          <Text>
            {startDate} {startTime}
            {endTime ? " - " + endTime : null}
          </Text>
        </View>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(LinearGradient)`
  border-radius: 15px;
  height: 300px;
`;

interface TitleProps {
  large?: boolean;
}

const Text = styled.Text<TitleProps>`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 18 : 14)}px;
  align-self: flex-end;
`;

const RunTitle = styled(Text)`
  align-self: flex-start;
  font-size: 24px;
`;

const BackgroundImage = styled.Image`
  width: 160px;
  height: 160px;
  opacity: 0.2;
`;

const ImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-vertical: 16px;
`;

const ContentWrapper = styled.View`
  padding: 20px;
  justify-content: space-between;
`;
