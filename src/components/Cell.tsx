import React from "react";
import {Position} from "../models/Position";
import "../styles/Cell.less";
// @ts-ignore
import * as Logo from '../styles/apple.png';

export type CellProps = {
    pos: Position;
    size: number;
    extraClass?: string;
};

export function Cell({ pos, size = 10, extraClass }: CellProps): JSX.Element {
    return (
        <div
            className={`sg-cell ${extraClass}`}
            data-pos={pos.toString()}
            style={{
                width: size,
                height: size
            }}
        >
            { extraClass?.includes("snake-head") ? <div className={"snake-eye"}></div> : null }
            { extraClass?.includes("apple-cell") ? <img className={"apple-image"} src={Logo}></img> : null }
        </div>
    );
}
