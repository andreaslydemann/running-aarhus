import React from "react";
import { styled } from "theme";
import Badge from "./Badge";
import Text from "./Text";
import { View } from "react-native";
import { getLanguage } from "utils";
import i18n from "i18n-js";
import moment from "moment";

function getBadgeText(
  cancelled: boolean,
  completed: boolean,
  participating: boolean
): string {
  if (cancelled) {
    return i18n.t("cancelled");
  } else if (completed) {
    return i18n.t("completed");
  } else if (participating) {
    return i18n.t("signedUp");
  } else {
    return i18n.t("signUp");
  }
}

export default ({ data }: { data: any }) => {
  const {
    startDateTime,
    endDateTime,
    meetingPoint,
    title,
    participating,
    cancelled
  } = data;

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

  const completed = new Date(startDateTime) <= new Date();
  const badgeText = getBadgeText(cancelled, completed, participating);

  return (
    <Wrapper>
      <Row>
        <View>
          <Day>{startDate}</Day>
          <Day>
            {startTime}
            {endTime ? " - " + endTime : null}
          </Day>
        </View>
        <Badge numberOfLines={2} text={badgeText} />
      </Row>
      <Desc bold>{title}</Desc>
      <Desc numberOfLines={1}>{meetingPoint}</Desc>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  border-radius: 15px;
  padding: 20px;
`;

const Day = styled(Text)`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
  font-size: 13px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

interface DescProps {
  bold?: boolean;
}

const Desc = styled(Text)<DescProps>`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
  ${({ bold }) => bold && "font-weight: bold;"} margin-top: 5px;
`;
