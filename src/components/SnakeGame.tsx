import React from "react";
import {Grid} from "./Grid";
import {getListOfRandomPositions} from "../utils";

export function SnakeGame(): JSX.Element {

    const rows = 17;
    const columns = 35;
    const randomPositionsForFood = getListOfRandomPositions(rows, columns, 15);

    return (
        <div>
            <h1>Snake Game by Hammad</h1>
            <Grid rows={rows} columns={columns} cellSize={50} active={randomPositionsForFood}/>
        </div>
    )
}
