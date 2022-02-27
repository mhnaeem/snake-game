import {Position} from "./Position";

export class Snake {

    private headPosition_: Position;
    private snakeBody_: Array<Position>;
    private readonly startingPosition_: Position;

    constructor(startingPosition: Position, body: Array<Position>) {
        this.snakeBody_ = body;
        this.startingPosition_ = startingPosition;
        this.headPosition_ = startingPosition;
    }

    getSnakeLength(): number {
        return this.snakeBody_.length;
    }

    getHeadPosition(): Position {
        return this.headPosition_;
    }

    getStartingPosition(): Position {
        return this.startingPosition_;
    }

    getSnakeBody(): Array<Position> {
        return this.snakeBody_;
    }

}
