import React, {useEffect, useState} from "react";
import {Grid} from "./Grid";
import {GameState} from "../models/GameState";
import {Position} from "../models/Position";
import {isOutOfBounds} from "../utils";

enum MoveDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

let timer: number;

export function SnakeGame(): JSX.Element {

    const [gameState, setGameState] = useState<GameState>(new GameState());
    const [moveDirection, setMoveDirection] = useState<MoveDirection>(MoveDirection.DOWN);
    const bounds = new Position(gameState.getColumns(), gameState.getRows());

    timer = setTimeout(() => {
        let newPos;
        const snakeHead = gameState.getSnake().getHeadPosition();
        switch (moveDirection) {
            case MoveDirection.DOWN:
                newPos = new Position(snakeHead.getX(), snakeHead.getY() + 1);
                break;
            case MoveDirection.RIGHT:
                newPos = new Position(snakeHead.getX() + 1, snakeHead.getY());
                break;
            case MoveDirection.LEFT:
                newPos = new Position(snakeHead.getX() - 1, snakeHead.getY());
                break;
            case MoveDirection.UP:
                newPos = new Position(snakeHead.getX(), snakeHead.getY() - 1);
                break;
        }

        if(isOutOfBounds(newPos, bounds)) {
            throw new GameOverError();
        }
        setGameState(new GameState(gameState.getSnake().updateHeadPosition(newPos), gameState.getFoodPositions()));
    }, 500);

    useEffect(() => {
        window.onkeydown = (e: KeyboardEvent) => {
            const prevent = () => {
                e.stopPropagation();
                e.preventDefault();
            }
            if(timer !== null) clearTimeout(timer);
            if (e.key == 'ArrowUp') {
                prevent();
                if (moveDirection === MoveDirection.DOWN) return;
                setMoveDirection(MoveDirection.UP);
            } else if (e.key == 'ArrowDown') {
                prevent();
                if (moveDirection === MoveDirection.UP) return;
                setMoveDirection(MoveDirection.DOWN);
            } else if (e.key == 'ArrowLeft') {
                prevent();
                if (moveDirection === MoveDirection.RIGHT) return;
                setMoveDirection(MoveDirection.LEFT);
            } else if (e.key == 'ArrowRight') {
                prevent();
                if (moveDirection === MoveDirection.LEFT) return;
                setMoveDirection(MoveDirection.RIGHT);
            }
        };
        return () => {
            window.onkeydown = null;
        }
    });

    return (
        <div>
            <h1>Snake Game by Hammad</h1>
            <Grid
                rows={gameState.getRows()}
                columns={gameState.getColumns()}
                cellSize={50}
                foodPositions={gameState.getFoodPositions()}
                snake={gameState.getSnake()}
            />
        </div>
    )
}
