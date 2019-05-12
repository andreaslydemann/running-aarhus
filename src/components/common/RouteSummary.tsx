import React from "react";
import { RouteDetails } from "types/common";
import { styled } from "theme";
import moment from "moment";

const Wrapper = styled.View`
  width: 100%;
`;

const DetailsTextWrapper = styled.View`
  flex-direction: row;
`;

const DetailsField = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
`;

const DetailsText = styled.Text`
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
        <DetailsField>Mødested: </DetailsField>
        <DetailsText numberOfLines={1}>{meetingPoint}</DetailsText>
      </DetailsTextWrapper>
      <DetailsTextWrapper>
        <DetailsField>Afstand: </DetailsField>
        <DetailsText numberOfLines={1}>{distance} km</DetailsText>
      </DetailsTextWrapper>
      {showEndDateTime ? (
        <DetailsTextWrapper>
          <DetailsField>Sluttidspunkt: </DetailsField>
          <DetailsText>kl. {endTime}</DetailsText>
        </DetailsTextWrapper>
      ) : null}
    </Wrapper>
  );
};

export default RouteSummary;
