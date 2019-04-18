import React from "react";
import { styled } from "theme";
import Label from "./Label";
import { View } from "react-native";
import { MONTHS } from "constants";
import i18n from "i18n-js";
import { Localization } from "expo";

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  margin: 20px;
  border-radius: 15px;
  padding: 20px;
  padding-right: 15px;
`;

const Day = styled.Text`
  color: white;
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
  color: white;
  font-size: 15px;
  ${({ bold }) => bold && "font-weight: bold;"} margin-top: 5px;
`;

export default ({ data }: { data: any }) => {
  const date = new Date(data.date);
  const startTimeString = date.toLocaleTimeString(Localization.locale, {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });

  date.setMinutes(date.getMinutes() + data.durationInMins);
  const endTimeString = date.toLocaleTimeString(Localization.locale, {
    hour12: false,
    hour: "numeric",
    minute: "numeric"
  });

  return (
    <Wrapper>
      <Row>
        <View>
          <Day>
            {date.getDate()} {i18n.t(MONTHS[date.getMonth()])}
          </Day>
          <Day>
            {startTimeString} - {endTimeString}
          </Day>
        </View>
        <Label
          numberOfLines={2}
          text={data.cancelled ? i18n.t("cancelled") : i18n.t("signedUp")}
        />
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>Kennedy Street</Desc>
    </Wrapper>
  );
};
