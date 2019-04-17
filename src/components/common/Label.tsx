import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo";

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 10px;
`;

const LabelText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default ({
  text,
  numberOfLines = 1
}: {
  text: string;
  numberOfLines: number;
}) => (
  <Wrapper colors={["#1481BA", "#0F5E88"]} start={[0.0, 0.0]} end={[1.0, 0.0]}>
    <LabelText numberOfLines={numberOfLines}>{text}</LabelText>
  </Wrapper>
);
