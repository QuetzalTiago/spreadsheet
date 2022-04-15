// React
import { useState } from "react";

// Components
import Cell from "../components/Cell";

// CSS
import styled from "styled-components";

// Types
import { CellType } from "../types";

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const AppDiv = styled.div``;

const generateCells = (amount: number) => {
  const result: CellType[] = [];
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

  const updateCell = (updatedCell: CellType) => {
    const index = cells.findIndex(
      (cell) => cell.x === updatedCell.x && cell.y === updatedCell.y
    );
    const newCellsArray = [...cells];
    newCellsArray[index] = updatedCell;

    setCells(newCellsArray);
  };

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
              {rowCells.map(({ x, y, value }) => (
                <Cell x={x} y={y} value={value} updateParent={updateCell} />
              ))}
            </div>
          );
        })}
      </div>
    </AppDiv>
  );
}

export default App;
