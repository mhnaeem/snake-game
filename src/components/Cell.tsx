import React from "react";
import {Position} from "../models/Position";
import "../styles/Cell.less";

export type CellProps = {
    pos: Position;
    active: boolean;
    size: number;
};

export function Cell({ pos, active, size = 10 }: CellProps): JSX.Element {
    return (
        <div
            className={`sg-cell ${active ? "active" : ""}`}
            data-pos={pos.toString()}
            style={{
                width: size,
                height: size
            }}
        >
        </div>
    );
}
