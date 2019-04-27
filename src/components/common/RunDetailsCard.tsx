import React from "react";
import { View } from "react-native";
import { styled } from "theme";

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
    <View>
      <Title>Mødested</Title>
      <Subtitle>{meetingLocation}</Subtitle>
      <Title>Distance</Title>
      <Subtitle>{distanceInKm}</Subtitle>
      {estimatedEndTime && [
        <Title>Sluttidspunkt</Title>,
        <Subtitle>{estimatedEndTime}</Subtitle>
      ]}
    </View>
  );
};

export default RunDetailsCard;
