import React from "react";
import { RouteDetails } from "types/common";
import Text from "./Text";
import { styled } from "theme";
import moment from "moment";
import i18n from "i18n-js";

const Wrapper = styled.View`
  width: 100%;
`;

const DetailsTextWrapper = styled.View`
  flex-direction: row;
`;

const DetailsField = styled(Text)`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const DetailsText = styled(Text)`
  color: ${({ theme }) => theme.activeTint};
  flex: 1;
`;

interface Props {
  routeDetails: RouteDetails;
  showEndDateTime: boolean;
}

const RouteSummary = ({ routeDetails, showEndDateTime }: Props) => {
  const { meetingPoint, distance, endDateTime } = routeDetails;

  if (!routeDetails) return null;

  const endTime = moment(endDateTime).format("HH.mm");

  return (
    <Wrapper>
      <DetailsTextWrapper>
        <DetailsField>{i18n.t("meetingPoint")}: </DetailsField>
        <DetailsText numberOfLines={1}>{meetingPoint}</DetailsText>
      </DetailsTextWrapper>
      <DetailsTextWrapper>
        <DetailsField>{i18n.t("distance")}: </DetailsField>
        <DetailsText numberOfLines={1}>{distance} km</DetailsText>
      </DetailsTextWrapper>
      {showEndDateTime ? (
        <DetailsTextWrapper>
          <DetailsField>{i18n.t("endTime")}: </DetailsField>
          <DetailsText>
            {i18n.t("timeUnit")}
            {endTime}
          </DetailsText>
        </DetailsTextWrapper>
      ) : null}
    </Wrapper>
  );
};

export default RouteSummary;
