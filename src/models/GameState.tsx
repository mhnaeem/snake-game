import {Snake} from "./Snake";
import {Position} from "./Position";
import {getListOfRandomPositions, positionOnList} from "../utils";
import {GameOverException} from "../components/GameOverError";

export class GameState {

    private readonly rows_: number;
    private readonly columns_: number;
    private readonly snake_: Snake;
    private readonly foodPositions_: Position[];
    private readonly allPositionKeys_: string[];
    private readonly gameOver_: boolean;

    constructor(snake?: Snake, foodPositions?: Position[], gameOver?: boolean) {
        this.rows_ = 15;
        this.columns_ = 35;
        this.snake_ = snake ?? this.initSnake();
        this.foodPositions_ = foodPositions ?? this.initRandomFoodPositions();
        this.allPositionKeys_ = this.initPositionKeys_();
        this.gameOver_ = !!gameOver;
    }

    initPositionKeys_() {
        const grid = [];

        for (let h = 0; h < this.rows_; h++) {
            for (let w = 0; w < this.columns_; w++) {
                const pos = new Position(w, h);
                grid.push(pos.toString());
            }
        }

        return grid;
    }

    addNewFoodPosition() {

        const filteredEmptyPositions = this.allPositionKeys_
            .filter(pos => !positionOnList(Position.fromString(pos), this.snake_.getSnakeBody()))
            .filter(pos => !positionOnList(Position.fromString(pos), this.foodPositions_));

        if (filteredEmptyPositions.length === 0) {
            throw new GameOverException();
        }

        const newFoodPosition = filteredEmptyPositions[Math.floor(Math.random()*filteredEmptyPositions.length)];
        this.foodPositions_.push(Position.fromString(newFoodPosition));
        return this.foodPositions_;
    }

    private initSnake() {
        const snakeBody = [new Position(2, 0), new Position(1, 0), new Position(0, 0)];
        return new Snake(snakeBody, new Position(this.columns_, this.rows_));
    }

    private initRandomFoodPositions() {
        return getListOfRandomPositions(this.rows_, this.columns_, 15)
            .filter(pos => !positionOnList(pos, this.snake_.getSnakeBody()))
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

    isGameOver() {
        return this.gameOver_;
    }

}