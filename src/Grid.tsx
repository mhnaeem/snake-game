import React from "react";
import {CellProps, Cell} from "./Cell";
import "./styles/Grid.less";

type GridProps = {
    rows: number;
    columns: number;
    cellSize: number;
}

type GridState = {
    [pos: string]: CellProps;
}

function isValidDimensions(columns: number, rows: number): boolean {
    return !(columns <= 0 || rows <= 0);
}

function generateGrid(columns: number, rows: number, cellSize: number): GridState {
    const mainGrid: GridState = {};

    for (let h = 0; h < rows; h++) {
        for (let w = 0; w < columns; w++) {
            const pos = `${w},${h}`;
            mainGrid[pos] = ({ y: h, x: w, active: false, size: cellSize });
        }
    }

    return mainGrid;
}

export function Grid({rows, columns, cellSize}: GridProps): JSX.Element {

    if(!isValidDimensions(rows, columns)) {
        throw new Error(`The provided dimensions width: ${columns} and height: ${rows} are not valid`);
    }

    const grid = generateGrid(columns, rows, cellSize);

    return (
        <div
            className={"sg-grid"}
            style={{
                gridTemplateColumns: new Array(columns).fill(`${cellSize}px`).join(" ")
            }}
        >
            {
                Object.keys(grid).map(r => <Cell {...grid[r]}/>)
            }
        </div>
    );
}
