// React
import React, { useEffect } from "react";
import { useState } from "react";

// CSS
import styled from "styled-components";

// Types
import { CellType } from "../types";

// Utils
import { KEYS, getCellSum } from "../utils";

const BorderedInput = styled.input`
  width: 57px;
  height: 20px;
  border: 1.5px solid #000;
  text-align: center;
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValueState(value);
    updateParent && updateParent({ x, y, value });
  };

  const handleKeyDown = (e: any) => {
    const value = e.currentTarget.value;
    e.keyCode === KEYS.ENTER && setValueState(getCellSum(value, cells));
    updateParent && updateParent({ x, y, value });
  };

  const handleClick = () => {
    setValueState(value);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setValueState(getCellSum(value, cells));
  };

  useEffect(() => {
    try {
      !isFocused && setValueState(getCellSum(value, cells));
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
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onClick={handleClick}
    />
  );
}
