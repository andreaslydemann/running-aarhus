import React from "react";
import { styled } from "theme";

interface Props {
  numberOfRuns?: number;
}

export default ({ numberOfRuns = 0 }: Props) => (
  <Wrapper>
    <ItemText>Completed runs: {numberOfRuns}</ItemText>
  </Wrapper>
);

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
`;

const ItemText = styled.Text`
  text-align: center;
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.activeTint};
`;
