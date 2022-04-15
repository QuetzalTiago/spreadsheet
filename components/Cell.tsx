// React
import React from "react";
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
}: CellType) {
  const [valueState, setValueState] = useState(value);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValueState(value);
    updateParent && updateParent({ x, y, value });
  };

  return (
    <BorderedInput
      type="text"
      value={valueState}
      disabled={disabled}
      onChange={handleChange}
    />
  );
}
