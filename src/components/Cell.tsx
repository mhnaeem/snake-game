import React from "react";
import {Position} from "../models/Position";
import "../styles/Cell.less";

export type CellProps = {
    pos: Position;
    active: boolean;
    size: number;
    extraClass?: string;
};

export function Cell({ pos, active, size = 10, extraClass }: CellProps): JSX.Element {
    return (
        <div
            className={`sg-cell ${active ? "active" : ""} ${extraClass}`}
            data-pos={pos.toString()}
            style={{
                width: size,
                height: size
            }}
        >
        </div>
    );
}
