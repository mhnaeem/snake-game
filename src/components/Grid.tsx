import React from "react";
import {CellProps, Cell} from "./Cell";
import "../styles/Grid.less";
import {Position} from "../models/Position";

type GridProps = {
    rows: number;
    columns: number;
    cellSize: number;
    active: Array<Position>;
}

type GridState = {
    [pos: string]: CellProps;
}

function isValidDimensions(columns: number, rows: number): boolean {
    return !(columns <= 0 || rows <= 0);
}

function generateGrid({rows, columns, cellSize, active}: GridProps): GridState {
    const mainGrid: GridState = {};
    const allActive: { [pos: string]: boolean } = active.reduce((a, v) => ({...a, [v.toString()]: v}), {});

    for (let h = 0; h < rows; h++) {
        for (let w = 0; w < columns; w++) {
            const pos = new Position(w, h);
            mainGrid[pos.toString()] = ({ pos, active: !!allActive[pos.toString()], size: cellSize });
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
