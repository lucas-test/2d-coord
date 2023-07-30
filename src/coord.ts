import { Vect } from "./vect";

export class Coord {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Copy the other coordinates in this.
     * @param c 
     */
    copy(other: Coord) {
        this.x = other.x;
        this.y = other.y;
    }

    sub(c: Coord) {
        return new Coord(this.x - c.x, this.y - c.y);
    }

    add(c: Coord) {
        return new Coord(this.x + c.x, this.y + c.y);
    }

    /**
     * Returns a Coord which is a copy of this.
     */
    clone() {
        return new Coord(this.x, this.y);
    }

    getTheta(v: Coord) {
        let angle1 = Math.atan2(this.x, this.y);
        let angle2 = Math.atan2(v.x, v.y);
        return angle2 - angle1;
    }

    /**
     * Returns the norm of this.
     * The norm of a coord(x,y) is the square root of x^2 + y^2.
     * @returns 
     */
    norm(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    getRho(v: Coord) {
        let d1 = this.norm();
        let d2 = v.norm();
        return d2/d1;
    }

    normalize(): Coord {
        const norm = this.norm();
        return new Coord(this.x/norm, this.y/norm);
    }

    rotateQuarter(){
        return new Coord(this.y, - this.x);
    }

    scale(r: number){
        return new Coord(this.x*r, this.y*r);
    }

    /**
     * Translates `this` by a shift Vect.
     */
    translate(shift: Vect) {
        this.x += shift.x;
        this.y += shift.y;
    }

    /**
     * `this += shift * factor`
     */
    translateF(shift: Vect, factor: number) {
        this.x += shift.x*factor;
        this.y += shift.y*factor;
    }

    rtranslate(shift: Vect) {
        this.x -= shift.x;
        this.y -= shift.y;
    }

    opposite(): Coord {
        return new Coord(-this.x, -this.y);
    }

    /**
     * Returns the distance from this to another Coord.
     * @param other The other coordinate.
     * @returns {number} The distance between the two coordinates.
     */
    distTo(other: Coord) {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }

    /**
     * Checks if this Coord is contained in a rectangle defined by two opposite corners
     * @param c1 A corner.
     * @param c2 Its opposite corner.
     */
    isInRect(c1: Coord, c2: Coord) : boolean {
        return Math.min(c1.x, c2.x) <= this.x && this.x <= Math.max(c1.x, c2.x) &&  Math.min(c1.y, c2.y) <= this.y && this.y <= Math.max(c1.y, c2.y);
    }

    /**
     * Returns the middle coordinates between this and another Coord.
     * @param c 
     * @returns 
     */
    middle(c: Coord) {
        return new Coord((this.x + c.x) / 2, (this.y + c.y) / 2);
    }

    /**
     * Returns the orthogonal projection of this on the line defined by a point `point` and a non zero vector.
     * The obtained Coord is therefore on the line.
     * @param point 
     * @param direction 
     */
    orthogonalProjection(point: Coord, direction: Vect): Coord{
        const norm = direction.norm();
        const u = new Vect(direction.x/norm, direction.y/norm);
        const v = Vect.fromCoords(point, this);
        const ps = u.x*v.x + u.y*v.y;
        return new Coord( point.x + u.x*ps , point.y + u.y*ps);
    }

    /**
     * Returns the distance from `this` to a segment defined by its two endpoints.
     * @param c1 First endpoint.
     * @param c2 Second endpoint.
     */
    distToSegment(c1: Coord, c2: Coord): number {
        const u = Vect.fromCoords(c1, c2);
        if (u.norm() == 0){ // the segment is trivial
            return this.distTo(c1);
        }
        const v1 = Vect.fromCoords(c1, this);
        const v2 = Vect.fromCoords(c2, this);
        if (u.scalarProd(v1) < 0){
            return this.distTo(c1); // the nearest point is c1
        } else if ( u.scalarProd(v2) >= 0){
            return this.distTo(c2); // the nearest point is c2
        } else {
            const p = this.orthogonalProjection(c1, u);
            return this.distTo(p);
        }
    }

    /**
     * Returns the middle coordinate of two coordinates.
     */
    static middle(c1: Coord, c2: Coord) {
        return new Coord((c1.x + c2.x) / 2, (c1.y + c2.y) / 2);
    }
}


