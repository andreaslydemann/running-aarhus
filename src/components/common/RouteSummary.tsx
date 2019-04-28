import React from "react";
import { View } from "react-native";
import { RouteDetails } from "types/common";
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
  routeDetails: RouteDetails;
}

const RouteSummary = (props: Props) => {
  const { meetingPoint, distance, endDateTime } = props.routeDetails;
  if (!(meetingPoint && distance)) return null;

  return (
    <View>
      <Title>Mødested</Title>
      <Subtitle>{meetingPoint}</Subtitle>
      <Title>Distance</Title>
      <Subtitle>{distance}</Subtitle>
      {endDateTime && [
        <Title>Sluttidspunkt</Title>,
        <Subtitle>{endDateTime}</Subtitle>
      ]}
    </View>
  );
};

export default RouteSummary;
