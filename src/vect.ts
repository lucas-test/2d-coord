import { Coord } from "./coord";

export class Vect {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the norm of `this`.
     */
    norm() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Copies `other`.
     */
    copy(other: Vect) {
        this.x = other.x;
        this.y = other.y;
    }

    translate(v: Vect) {
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * Returns the opposite Vect.
     */
    opposite(): Vect {
        return new Vect(-this.x, -this.y);
    }

    /**
     * Returns a Vect from `src` to `dest`.
     * @param src 
     * @param dest 
     */
    static fromCoords(src: Coord, dest: Coord): Vect {
        return new Vect(dest.x - src.x, dest.y - src.y);
    }

    /**
     * Returns the scalar product between two Vect.
     */
    scalarProd(other: Vect): number {
        return this.x * other.x + this.y * other.y;
    }
}
