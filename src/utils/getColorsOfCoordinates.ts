import { Coordinate } from "types/common";
import { LINE_COLORS, SPACING_COLOR } from "constants";

export function getColorsOfCoordinates(coordinates: Coordinate[]) {
  let missingColors = coordinates.length - LINE_COLORS.length;
  const colorsPerRound = Math.floor(missingColors / LINE_COLORS.length - 1);

  return LINE_COLORS.reduce((arr: string[], b: string, i: number) => {
    const colorArray = [...arr, b];

    if (missingColors > 0 && i < LINE_COLORS.length - 1) {
      for (let i = 0; i < colorsPerRound; i++) {
        colorArray.push(SPACING_COLOR);
        missingColors--;
      }
    }

    return colorArray;
  }, []);
}
