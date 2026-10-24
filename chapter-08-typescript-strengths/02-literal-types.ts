// Chapter 8.2 - Literal types: exact allowed values
// Run: npx tsx chapter-08-typescript-strengths/02-literal-types.ts
//
// Real-world picture: a T-shirt size selector. You cannot type "medium-ish";
// you must pick exactly S, M, L or XL.

type Size = "S" | "M" | "L" | "XL";
type Direction = "north" | "south" | "east" | "west";
type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

function orderShirt(color: string, size: Size): string {
  return `One ${color} T-shirt, size ${size}`;
}
console.log(orderShirt("navy", "M"));
// orderShirt("navy", "medium"); // Error: '"medium"' is not assignable to type 'Size'.

function move(position: [number, number], dir: Direction): [number, number] {
  const [x, y] = position;
  switch (dir) {
    case "north": return [x, y + 1];
    case "south": return [x, y - 1];
    case "east": return [x + 1, y];
    case "west": return [x - 1, y];
  }
}
let robot: [number, number] = [0, 0];
for (const step of ["north", "north", "east"] as const) robot = move(robot, step);
console.log("Robot is at", robot);

const roll: DiceFace = 4;
console.log("Rolled:", roll);

// `as const` freezes values into literal types: perfect for fixed lists.
const PLANS = ["free", "pro", "team"] as const;
type Plan = (typeof PLANS)[number]; // "free" | "pro" | "team"
const myPlan: Plan = "pro";
console.log("All plans:", PLANS.join(", "), "| mine:", myPlan);

// Template literal types build new string types
type Color = "red" | "blue";
type CssClass = `btn-${Color}`; // "btn-red" | "btn-blue"
const cls: CssClass = "btn-blue";
console.log("Button class:", cls);
