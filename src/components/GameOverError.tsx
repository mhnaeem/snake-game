import React, {useState} from "react";
import Modal from "react-modal";

export function GameOverError({ onCloseCallback }: { onCloseCallback: Function }): JSX.Element {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <Modal
            isOpen={isOpen}
        >
            <div>Opps sorry you lost</div>
            <button
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
