import {Position} from "./models/Position";

function getRandomArbitrary(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomPosition(rows: number, columns: number): Position {
    const y = getRandomArbitrary(0, rows);
    const x = getRandomArbitrary(0, columns);
    return new Position(x, y);
}

export function getListOfRandomPositions(rows: number, columns: number, quantity: number): Array<Position> {
    const positions = [];
    for (let i = 0; i < quantity; i++) {
        positions.push(getRandomPosition(rows, columns));
    }
    return positions;
}

export function isOutOfBounds(pos: Position, bounds: Position): boolean {
    return pos.getY() > bounds.getY() || pos.getX() > bounds.getX() || pos.getY() < 0 || pos.getX() < 0;
}
