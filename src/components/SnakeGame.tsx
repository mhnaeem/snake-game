import React, {useEffect, useState} from "react";
import {Grid} from "./Grid";
import {GameState} from "../models/GameState";
import {Position} from "../models/Position";
import {isOutOfBounds, positionOnList} from "../utils";
import {GameOverError} from "./GameOverError";

enum MoveDirection {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

let updateTimer: number;
let oldTime: number = Date.now();
const SPEED: number = 250;

export function SnakeGame(): JSX.Element {

    const [gameState, setGameState] = useState<GameState>(new GameState());
    const [moveDirection, setMoveDirection] = useState<MoveDirection>(MoveDirection.DOWN);
    const bounds = new Position(gameState.getColumns(), gameState.getRows());

    updateTimer = setTimeout(() => {

        if(gameState.isGameOver()) return;

        let newPos: Position;
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

        if(isOutOfBounds(newPos, bounds) || positionOnList(newPos, gameState.getSnake().getSnakeBody())) {
            setGameState(new GameState(gameState.getSnake(), gameState.getFoodPositions(), true));
            return;
        }

        let foodCell = false;
        let updatedFoodPositions = gameState.getFoodPositions();
        if(positionOnList(newPos, updatedFoodPositions)){
            foodCell = true;
            updatedFoodPositions = updatedFoodPositions.filter(pos => !pos.equal(newPos));
        }

        // add new food every X seconds
        const currentTime = Date.now();
        if((currentTime - oldTime) >= (SPEED * 10)) {
            gameState.addNewFoodPosition();
            oldTime = currentTime;
        }

        setGameState(new GameState(gameState.getSnake().updateHeadPosition(newPos, !foodCell), updatedFoodPositions));
    }, SPEED);

    if(gameState.isGameOver()) {
        clearTimeout(updateTimer);
    }

    useEffect(() => {
        window.onkeydown = (e: KeyboardEvent) => {
            const prevent = () => {
                e.stopPropagation();
                e.preventDefault();
            }

            const clearUpdateTimer = () => {
                if(updateTimer !== null) clearTimeout(updateTimer);
            }

            if (e.key == 'ArrowUp') {
                prevent();
                if (moveDirection === MoveDirection.DOWN) return;
                clearUpdateTimer();
                setMoveDirection(MoveDirection.UP);
            } else if (e.key == 'ArrowDown') {
                prevent();
                if (moveDirection === MoveDirection.UP) return;
                clearUpdateTimer();
                setMoveDirection(MoveDirection.DOWN);
            } else if (e.key == 'ArrowLeft') {
                prevent();
                if (moveDirection === MoveDirection.RIGHT) return;
                clearUpdateTimer();
                setMoveDirection(MoveDirection.LEFT);
            } else if (e.key == 'ArrowRight') {
                prevent();
                if (moveDirection === MoveDirection.LEFT) return;
                clearUpdateTimer();
                setMoveDirection(MoveDirection.RIGHT);
            }
        };
        return () => {
            window.onkeydown = null;
        }
    });


    if(gameState.isGameOver()) {
        return <GameOverError/>;
    }

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
