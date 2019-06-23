import { Coordinate } from "types/common";
import { theme } from "theme";

export function getColorsOfCoordinates(coordinates: Coordinate[]) {
  let missingColors = coordinates.length - theme.strokeGradient.length;
  const colorsPerRound = Math.floor(
    missingColors / theme.strokeGradient.length - 1
  );

  return theme.strokeGradient.reduce((arr: string[], b: string, i: number) => {
    const colorArray = [...arr, b];

    if (missingColors > 0 && i < theme.strokeGradient.length - 1) {
      for (let i = 0; i < colorsPerRound; i++) {
        colorArray.push(theme.strokeSpacing);
        missingColors--;
      }
    }

    return colorArray;
  }, []);
}
