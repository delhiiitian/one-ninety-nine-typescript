// A small module with named exports, used by 01-export-import.ts

export const PI_ROUNDED = 3.14;

export function circleArea(radius: number): number {
  return Math.PI * radius ** 2;
}

export function rectangleArea(width: number, height: number): number {
  return width * height;
}

export interface Room {
  name: string;
  width: number;
  length: number;
}

// Not exported: private to this file
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function floorArea(rooms: Room[]): number {
  return round2(rooms.reduce((sum, r) => sum + rectangleArea(r.width, r.length), 0));
}
