import React from "react";
import { styled } from "theme";
import Label from "./Label";
import { View } from "react-native";

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
  const time = new Date(data.date._seconds * 1000);

  return (
    <Wrapper>
      <Row>
        <View>
          <Day>{time.toDateString()}</Day>
          <Day>17:30 - 18:00</Day>
        </View>
        <Label numberOfLines={2} text={data.cancelled ? "Afmeldt" : "Tilmeldt"} />
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>Kennedy Street</Desc>
    </Wrapper>
  );
};
