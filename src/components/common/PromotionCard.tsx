import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import { View } from "react-native";
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
      <BackgroundImage source={require("../../../assets/runner.png")} />
      <ContentWrapper>
        <View>
          <RunTitle>{title}</RunTitle>
        </View>
        <View>
          <Title large adjustsFontSizeToFit numberOfLines={1}>
            {meetingPoint}
          </Title>
          <Title>
            {startDate} {startTime}
            {endTime ? " - " + endTime : null}
          </Title>
        </View>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(LinearGradient)`
  flex: 1;
  border-radius: 15px;
  height: 300px;
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
