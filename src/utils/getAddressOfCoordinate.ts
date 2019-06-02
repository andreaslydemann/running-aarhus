import axios from "axios";
import { Coordinate } from "types/common";
import { REVERSE_GEOCODE_URL } from "constants";

export async function getAddressOfCoordinate(coordinate: Coordinate) {
  if (!coordinate) return "";

  const { latitude, longitude } = coordinate;

  const {
    data: { address }
  } = await axios.get(
    `${REVERSE_GEOCODE_URL}&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1";`
  );

  const road = address.road
    ? address.road + (address.house_number ? ` ${address.house_number}` : "")
    : null;

  const addressParts = [road, address.suburb, address.postcode];

  const filteredParts = addressParts.filter((part: any) => !!part);
  let fullAddress = "";

  for (let i = 0; i < filteredParts.length; i++) {
    fullAddress += filteredParts[i];

    if (filteredParts.length - 1 !== i) fullAddress += ", ";
  }

  return fullAddress;
}
