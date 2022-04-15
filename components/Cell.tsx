// React
import React, { useEffect } from "react";
import { useState } from "react";

// CSS
import styled from "styled-components";

// Types
import { CellType } from "../types";

const BorderedInput = styled.input`
  width: 70px;
  height: 20px;
  border: 1.5px solid #000;
`;

export default function Cell({
  x,
  y,
  value,
  disabled,
  updateParent,
  cells,
}: CellType) {
  const [valueState, setValueState] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const getCellSum = (cellValue: string) => {
    const insideParenthesesRegEx = /\(([^)]+)\)/;
    const matches = insideParenthesesRegEx.exec(cellValue);

    if (!cellValue.includes("SUM(") || !matches) return cellValue;

    const cellCoordinates = matches[1].replace(/\W+/g, " ").split(" ");

    const findCell = (XYString: string) =>
      cells.find(({ x, y }) => `${x}${y + 1}` === XYString);

    const firstCell = findCell(cellCoordinates[0]);
    const secondCell = findCell(cellCoordinates[1]);

    const result = parseInt(firstCell.value) + parseInt(secondCell.value);
    if (!result && result !== 0) {
      return cellValue;
    } else {
      return result;
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValueState(value);
    updateParent && updateParent({ x, y, value });
  };

  const handleKeyDown = (e: any) => {
    const value = e.currentTarget.value;
    e.keyCode === 13 && setValueState(getCellSum(value));
    updateParent && updateParent({ x, y, value });
  };

  const handleClick = () => {
    setValueState(value);
    setIsFocused(true);
  };

  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    try {
      !isFocused && setValueState(getCellSum(value));
    } catch (error) {
      console.log(error);
    }
  }, [cells]);

  return (
    <BorderedInput
      type="text"
      value={valueState}
      disabled={disabled}
      onChange={handleChange}
      onDoubleClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onClick={handleClick}
    />
  );
}
