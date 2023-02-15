import React from "react";
import {Grid} from "./Grid";
import {getListOfRandomPositions} from "../utils";
import {Position} from "../models/Position";
import {Snake} from "../models/Snake";

export function SnakeGame(): JSX.Element {

    const rows = 17;
    const columns = 35;
    const randomPositionsForFood = getListOfRandomPositions(rows, columns, 15);
    const snakeBody = [new Position(0, 0), new Position(0, 1)];

    return (
        <div>
            <h1>Snake Game by Hammad</h1>
            <Grid
                rows={rows}
                columns={columns}
                cellSize={50}
                foodPositions={randomPositionsForFood}
                snake={new Snake(new Position(0, 0), snakeBody)}
            />
        </div>
    )
}
