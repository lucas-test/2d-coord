import { Coord } from "./coord";

export class Vect {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns a Vect which is a copy of `this`.
     */
    clone(): Vect {
        return new Vect(this.x, this.y);
    }

    /**
     * Returns the norm of `this`.
     */
    norm(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Copies `other`.
     */
    copy(other: Vect) {
        this.x = other.x;
        this.y = other.y;
    }

    /**
     * `this += v;` where `v` is another Vect.
     */
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

    /**
     * Rotates `this` Vect.
     * @param angle is is radians (3.14 or Math.PI for an half circle)
     */
    rotate(angle: number){
        const a = Math.cos(angle)*this.x - Math.sin(angle)*this.y;
        const b = Math.sin(angle)*this.x + Math.cos(angle)*this.y;
        this.x = a;
        this.y = b;
    }

    /**
     * `this *= r;` where r is a number
     */
    scale(r: number){
        this.x *= r;
        this.y *= r;
    }
}
