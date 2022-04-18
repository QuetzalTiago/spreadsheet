import { CellType } from "./types";

export enum KEYS {
  "ENTER" = 13,
}

export const findCell = (XYString: string, cells: CellType[]) =>
  cells?.find(({ x, y }) => `${x}${y + 1}` === XYString);

export const getCellIndexByCoordinates = (
  x: string,
  y: number,
  cells: CellType[]
) => cells.findIndex((cell) => cell.x === x && cell.y === y);

export const getCellSum = (cellValue: string, cells: CellType[]) => {
  const insideParenthesesRegEx = /\(([^)]+)\)/;
  const matches = insideParenthesesRegEx.exec(cellValue);

  if (!cellValue.includes("SUM(") || !matches) return cellValue;

  const cellCoordinates = matches[1].replace(/\W+/g, " ").split(" ");

  const firstCell = findCell(cellCoordinates[0], cells);
  const secondCell = findCell(cellCoordinates[1], cells);

  const result =
    parseInt(getCellSum(firstCell.value, cells)) +
    parseInt(getCellSum(secondCell.value, cells));
  if (!result && result !== 0) {
    return cellValue;
  } else {
    return result;
  }
};

export const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
