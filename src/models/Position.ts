export class Position {
    private readonly x_: number;
    private readonly y_: number;

    constructor(x: number, y: number) {
        this.x_ = x;
        this.y_ = y;
    }

    getX(): number {
        return this.x_;
    }

    getY(): number {
        return this.y_;
    }

    toString(): string {
        return `${this.x_},${this.y_}`;
    }

    static fromString(pos: string): Position {
        try {
            const splitUp = pos.split(",").map(p => parseInt(p));
            return new Position(splitUp[0], splitUp[1]);
        }
        catch (e) {
            throw new Error("Provided position string is not in the valid 'x,y' format");
        }
    }

    equal(pos: Position): boolean {
        return pos.toString() === this.toString();
    }
}
