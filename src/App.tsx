import { useState } from "react";
import Cell from "../components/Cell";
import styled from "styled-components";

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const AppDiv = styled.div``;

const generateCells = (amount: number) => {
  const result: { x: string; y: number; value: string }[] = [];
  alphabet.forEach((x) => {
    [...Array(amount)].forEach((_, y) => {
      result.push({ x, y, value: "" });
    });
  });
  return result;
};

function App() {
  const [numberOfCells, setNumberOfCells] = useState(25);
  const [cells, setCells] = useState(generateCells(numberOfCells));

  const updateCell = () => {};

  return (
    <AppDiv>
      <div>
        <div>
          <Cell disabled />
          {alphabet.map((letter) => (
            <Cell value={letter} disabled />
          ))}
        </div>
        {[...Array(numberOfCells)].map((_, i) => {
          const rowCells = cells.filter((cell) => cell.y === i);
          return (
            <div>
              <Cell value={(i + 1).toString()} />
              {rowCells.map(({ value }) => (
                <Cell value={value} />
              ))}
            </div>
          );
        })}
      </div>
    </AppDiv>
  );
}

export default App;
