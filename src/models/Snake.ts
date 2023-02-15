import {Position} from "./Position";

export class Snake {

    private headPosition_: Position;
    private readonly snakeBody_: Array<Position>;
    private readonly bounds_: Position;

    constructor(body: Array<Position>, bounds: Position) {
        this.snakeBody_ = body;
        this.headPosition_ = body[0];
        this.bounds_ = bounds;
    }

    getSnakeLength(): number {
        return this.snakeBody_.length;
    }

    getHeadPosition(): Position {
        return this.headPosition_;
    }

    getSnakeBody(): Array<Position> {
        return this.snakeBody_;
    }

    updateHeadPosition(pos: Position, removeLastCell: boolean): Snake {
        this.headPosition_ = pos;
        this.snakeBody_.unshift(this.headPosition_);
        if(removeLastCell) this.snakeBody_.pop();
        return this;
    }
}
