import React from "react";
import { styled } from "theme";
import i18n from "i18n-js";

interface Props {
  numberOfRuns?: number;
}

export default ({ numberOfRuns = 0 }: Props) => (
  <Wrapper>
    <ItemText>
      {numberOfRuns} {i18n.t("runsCompleted")}
    </ItemText>
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
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.activeTint};
`;
