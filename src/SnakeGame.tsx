import React from "react";
import {Grid} from "./Grid";

export function SnakeGame(): JSX.Element {
    return (
        <div>
            <h1>Snake Game by Hammad</h1>
            <Grid rows={17} columns={35} cellSize={50} active={[{x: 10, y:10}, {x: 11, y:11}]}/>
        </div>
    )
}
