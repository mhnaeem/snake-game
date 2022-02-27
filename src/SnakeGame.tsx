import React from "react";
import {Grid} from "./Grid";

export function SnakeGame(): JSX.Element {
    return (
        <div>
            <h1>Snake Game by Hammad</h1>
            <Grid rows={17} columns={35} cellSize={50} />
        </div>
    )
}
