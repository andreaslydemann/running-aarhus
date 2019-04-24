import React from "react";
import { styled } from "theme";

const Wrapper = styled.View`
  background: ${({ theme }) => theme.primary};
  padding: 20px;
  border-radius: 6px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  font-weight: bold;
  margin: 5px 0;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.activeTint};
  margin: 2px 0;
`;

interface Props {
  meetingLocation: string;
  distanceInKm: number;
  estimatedEndTime?: Date;
}

const RunDetailsCard = ({
  meetingLocation,
  distanceInKm,
  estimatedEndTime
}: Props) => {
  if (!(meetingLocation && distanceInKm)) return null;

  return (
    <Wrapper>
      <Title>Mødested</Title>
      <Subtitle>{meetingLocation}</Subtitle>
      <Title>Distance</Title>
      <Subtitle>{distanceInKm}</Subtitle>
      {estimatedEndTime && [
        <Title>Sluttidspunkt</Title>,
        <Subtitle>{estimatedEndTime}</Subtitle>
      ]}
    </Wrapper>
  );
};

export default RunDetailsCard;
