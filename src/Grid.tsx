import React from "react";
import {CellProps, Cell} from "./Cell";
import "./styles/Grid.less";

type GridProps = {
    rows: number;
    columns: number;
    cellSize: number;
}

function isValidDimensions(columns: number, rows: number): boolean {
    return !(columns <= 0 || rows <= 0);
}

function generateGrid(columns: number, rows: number, cellSize: number): Array<CellProps> {
    const mainGrid: Array<CellProps> = [];

    for (let h = 0; h < rows; h++) {
        for (let w = 0; w < columns; w++) {
            mainGrid.push({ y: h, x: w, active: false, size: cellSize });
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
                grid.map(r => <Cell {...r}/>)
            }
        </div>
    );
}
