import {Snake} from "./Snake";
import {Position} from "./Position";
import {getListOfRandomPositions} from "../utils";

export class GameState {

    private readonly rows_: number;
    private readonly columns_: number;
    private readonly snake_: Snake;
    private readonly foodPositions_: Position[];

    constructor(snake?: Snake, foodPositions?: Position[]) {
        this.rows_ = 17;
        this.columns_ = 35;
        this.snake_ = snake ?? this.initSnake();
        this.foodPositions_ = foodPositions ?? this.initRandomFoodPositions();
    }

    private initSnake() {
        const snakeBody = [new Position(2, 0), new Position(1, 0), new Position(0, 0)];
        return new Snake(snakeBody, new Position(this.columns_, this.rows_));
    }

    private initRandomFoodPositions() {
        return getListOfRandomPositions(this.rows_, this.columns_, 15)
            .filter(pos => !this.snake_.getSnakeBody().find(p => p.equal(pos)))
    }

    getFoodPositions() {
        return this.foodPositions_;
    }

    getRows() {
        return this.rows_;
    }

    getColumns() {
        return this.columns_;
    }

    getSnake() {
        return this.snake_;
    }
}