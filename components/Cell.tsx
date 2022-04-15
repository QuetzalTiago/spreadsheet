import React from "react";
import styled from "styled-components";

//styled component Li
const BorderedInput = styled.input`
  width: 70px;
  height: 20px;
  border: 1.5px solid #000;
`;

type Props = {
  value?: string;
  disabled?: boolean;
};

export default function Cell({ value, disabled }: Props) {
  return <BorderedInput value={value} disabled={disabled} />;
}
