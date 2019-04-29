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

  return `${address.house_number ? address.house_number + " " : ""}${
    address.road ? address.road + ", " : ""
  }${address.suburb ? address.suburb + ", " : ""}${
    address.postcode ? address.postcode : ""
  }`;
}
