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

  const getCellIndexByCoordinate = (x: string, y: number) =>
    cells.findIndex((cell) => cell.x === x && cell.y === y);

  const updateCell = (newCell: CellType) => {
    const index = getCellIndexByCoordinate(newCell.x, newCell.y);
    const newCellsArray = [...cells];
    newCellsArray[index] = newCell;

    setCells(newCellsArray);
  };

  return (
    <AppDiv>
      <div>
        <div>
          <Cell x={""} y={0} disabled />
          {alphabet.map((letter) => (
            <Cell x={""} y={0} value={letter} disabled />
          ))}
        </div>
        {[...Array(numberOfCells)].map((_, i) => {
          const rowCells = cells.filter((cell) => cell.y === i);
          return (
            <div>
              <Cell x={""} y={0} value={(i + 1).toString()} />
              {rowCells.map(({ x, y, value }) => (
                <Cell
                  x={x}
                  y={y}
                  value={value}
                  updateParent={updateCell}
                  cells={cells}
                />
              ))}
            </div>
          );
        })}
      </div>
    </AppDiv>
  );
}

export default App;
