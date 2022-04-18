// React
import { useState } from "react";

// Components
import Cell from "../components/Cell";

// Types
import { CellType } from "../types";

// Utils
import { alphabet, getCellIndexByCoordinates } from "../utils";

// CSS
import styled from "styled-components";

const Table = styled.div`
  overflow-y: scroll;
  display: flex;
`;

const generateCells = (amount: number) => {
  const result: CellType[] = [];
  alphabet.forEach((x) => {
    [...Array(amount)].forEach((_, y) => {
      result.push({ x, y, value: "" });
    });
  });
  return result;
};

function CellTable() {
  const [rows, setRows] = useState(50);
  const [cells, setCells] = useState(generateCells(rows));

  const updateCell = (newCell: CellType) => {
    const index = getCellIndexByCoordinates(newCell.x, newCell.y, cells);
    const newCellsArray = [...cells];
    newCellsArray[index] = newCell;

    setCells(newCellsArray);
  };

  return (
    <>
      <Table>
        <div>
          <Cell disabled />
          {alphabet.map((letter) => (
            <Cell value={letter} disabled />
          ))}
        </div>
        {[...Array(rows)].map((_, i) => {
          const rowCells = cells.filter((cell) => cell.y === i);
          return (
            <div>
              <Cell value={(i + 1).toString()} disabled />
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
      </Table>
    </>
  );
}

export default CellTable;
