import { Coord } from "./coord";

/**
 * Returns true if there is an intersection between segments [a,b] and segments [c,d] where a,b,c and d are Coords.
 * TODO: change the 0.001 precision
 */
export function isSegmentsIntersection(a: Coord, b: Coord, c: Coord, d: Coord): boolean{
    const det = (a.x-b.x)*(d.y-c.y) - (a.y-b.y)*(d.x-c.x);
    if ( det == 0) {
        return false;
    }
    const t1 = ((d.x-b.x)*(d.y-c.y) + (d.y-b.y)*(-(d.x-c.x))) / det;
    const t2 = ((d.x-b.x)*(-(a.y-b.y))+(d.y-b.y)*(a.x-b.x)) / det;
    return 0.001 < t1 && t1 < 0.999 && 0.001 < t2 && t2 < 0.999;
}