import React, {useState} from "react";
import Modal from "react-modal";
import "../styles/GameOverError.less";
import {GameState} from "../models/GameState";

export function GameOverError({ onCloseCallback, gameState }: { onCloseCallback: Function, gameState: GameState }): JSX.Element {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <Modal
            isOpen={isOpen}
            className={"game-over-modal"}
        >
            <h1>Game Over!</h1>
            <p>Your snake was {gameState.getSnake().getSnakeBody().length} blocks long</p>
            <button
                className={"restart-game-button"}
                onClick={(e) => {
                    setIsOpen(false);
                    onCloseCallback();
                }}
            >Restart</button>
        </Modal>
    );
}

export class GameOverException extends Error {

}
