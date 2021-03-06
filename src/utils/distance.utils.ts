import { Coordinate } from "types/common";

export function getDistanceOfCoordinates(coordinates: Coordinate[]) {
  if (coordinates.length <= 1) return 0;

  let distance = 0;
  let lastCoordinate;

  for (let i = 0; i < coordinates.length; i++) {
    distance += lastCoordinate
      ? calculateDistance(lastCoordinate, coordinates[i])
      : calculateDistance(coordinates[i], coordinates[i + 1]);

    lastCoordinate = coordinates[i];
  }

  return Math.round(distance * 100) / 100;
}

export function calculateDistance(
  coordinate1: Coordinate,
  coordinate2: Coordinate
) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((coordinate2.latitude - coordinate1.latitude) * p) / 2 +
    (c(coordinate1.latitude * p) *
      c(coordinate2.latitude * p) *
      (1 - c((coordinate2.longitude - coordinate1.longitude) * p))) /
      2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
