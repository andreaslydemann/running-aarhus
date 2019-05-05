import React from "react";
import { styled } from "theme";
import Label from "./Label";
import { View } from "react-native";
import { MONTHS } from "constants";
import i18n from "i18n-js";
import { Localization } from "expo";

export default ({ data }: { data: any }) => {
  const { startDateTime, endDateTime, meetingPoint, title, cancelled } = data;

  const startDate = new Date(startDateTime);
  const startTimeString = new Date(startDateTime).toLocaleTimeString(
    Localization.locale,
    {
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    }
  );

  return (
    <Wrapper>
      <Row>
        <View>
          <Day>
            {startDate.getDate()} {i18n.t(MONTHS[startDate.getMonth()])}
          </Day>
          <Day>
            {startTimeString} - {endDateTime}
          </Day>
        </View>
        <Label
          numberOfLines={2}
          text={cancelled ? i18n.t("cancelled") : i18n.t("signedUp")}
        />
      </Row>
      <Desc bold>{title}</Desc>
      <Desc numberOfLines={1}>{meetingPoint}</Desc>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  margin: 20px;
  border-radius: 15px;
  padding: 20px;
  padding-right: 15px;
`;

const Day = styled.Text`
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

const Desc = styled.Text<DescProps>`
  color: ${({ theme }) => theme.activeTint};
  font-size: 15px;
  ${({ bold }) => bold && "font-weight: bold;"} margin-top: 5px;
`;
