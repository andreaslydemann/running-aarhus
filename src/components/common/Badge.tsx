import React from "react";
import { styled } from "theme";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";

export default ({
  text,
  numberOfLines = 1
}: {
  text: string;
  numberOfLines: number;
}) => (
  <Wrapper colors={["#1481BA", "#0F5E88"]} start={[0.0, 0.0]} end={[1.0, 0.0]}>
    <BadgeText numberOfLines={numberOfLines}>{text}</BadgeText>
  </Wrapper>
);

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  padding: 10px 15px;
`;

const BadgeText = styled(Text)`
  color: #fff;
  font-weight: bold;
`;
