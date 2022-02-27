import React from "react";
import {CellProps, Cell} from "./Cell";
import "./styles/Grid.less";

type GridProps = {
    rows: number;
    columns: number;
    cellSize: number;
    active: Array<{
        x: number,
        y: number
    }>;
}

type GridState = {
    [pos: string]: CellProps;
}

function isValidDimensions(columns: number, rows: number): boolean {
    return !(columns <= 0 || rows <= 0);
}

function generateGrid({rows, columns, cellSize, active}: GridProps): GridState {
    const mainGrid: GridState = {};
    const allActive: { [pos: string]: boolean } = active.reduce((a, v) => {
        const key = `${v.x},${v.y}`;
        return {...a, [key]: v}
    }, {});

    for (let h = 0; h < rows; h++) {
        for (let w = 0; w < columns; w++) {
            const x = w;
            const y = h;
            const pos = `${x},${y}`;
            mainGrid[pos] = ({ y: y, x: x, active: !!allActive[pos], size: cellSize });
        }
    }

    return mainGrid;
}

export function Grid({rows, columns, cellSize, active}: GridProps): JSX.Element {

    if(!isValidDimensions(rows, columns)) {
        throw new Error(`The provided dimensions width: ${columns} and height: ${rows} are not valid`);
    }

    const grid = generateGrid({columns, rows, cellSize, active});

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
