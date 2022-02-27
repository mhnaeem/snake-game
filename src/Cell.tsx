import React from "react";
import "./styles/Cell.less";

export type CellProps = {
    x: number;
    y: number;
    active: boolean;
    size: number;
};

export function Cell({ x, y, active, size = 10 }: CellProps): JSX.Element {
    return (
        <div
            className={`sg-cell ${active ? "active" : ""}`}
            data-pos-x={x}
            data-pos-y={y}
            style={{
                width: size,
                height: size
            }}
        >
        </div>
    );
}
