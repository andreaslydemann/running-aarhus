import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";
import Label from "./Label";

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  margin: 20px;
  border-radius: 15px;
  padding: 20px;
  padding-right: 15px;
`;

const DateWrapper = styled(LinearGradient)`
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

interface DayProps {
  large?: boolean;
}

const Day = styled.Text<DayProps>`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 20 : 13)}px;
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
  const time = new Date(data.netstamp * 1000);
  return (
    <Wrapper>
      <Row>
        <DateWrapper
          colors={["#ffb39d", "#ff43bb"]}
          start={[0.0, 0.25]}
          end={[0.5, 1.0]}
        >
          {data.netstamp === 0 ? (
            <Day>TBD</Day>
          ) : (
            <>
              <Day>{time.getDate()}</Day>
              <Day>{time.getMonth()}</Day>
            </>
          )}
        </DateWrapper>
        <Label numberOfLines={2} text={data.notes} />
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>hello</Desc>
    </Wrapper>
  );
};
