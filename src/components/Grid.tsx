import React from "react";
import {CellProps, Cell} from "./Cell";
import "../styles/Grid.less";
import {Position} from "../models/Position";
import {Snake} from "../models/Snake";

type GridProps = {
    rows: number;
    columns: number;
    cellSize: number;
    foodPositions: Array<Position>;
    snake: Snake;
}

type GridState = {
    [pos: string]: CellProps;
}

function isValidDimensions(columns: number, rows: number): boolean {
    return !(columns <= 0 || rows <= 0);
}

function generateGrid({rows, columns, cellSize, foodPositions, snake}: GridProps): GridState {
    const mainGrid: GridState = {};
    const allActive: { [pos: string]: boolean } = foodPositions.reduce((a, v) => ({...a, [v.toString()]: v}), {});
    const snakePositions: string[] = snake.getSnakeBody().map(p => p.toString());

    for (let h = 0; h < rows; h++) {
        for (let w = 0; w < columns; w++) {
            const pos = new Position(w, h);
            mainGrid[pos.toString()] = ({
                pos,
                active: !!allActive[pos.toString()] && !snakePositions.includes(pos.toString()),
                size: cellSize,
                extraClass: snakePositions.includes(pos.toString()) ? "snake-cell" : ""
            });
        }
    }

    return mainGrid;
}

export function Grid({rows, columns, cellSize, foodPositions, snake}: GridProps): JSX.Element {

    if(!isValidDimensions(rows, columns)) {
        throw new Error(`The provided dimensions width: ${columns} and height: ${rows} are not valid`);
    }

    const grid = generateGrid({columns, rows, cellSize, foodPositions, snake});

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
