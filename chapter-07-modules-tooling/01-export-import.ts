// Chapter 7.1 - Splitting code into modules: export and import
// Run: npx tsx chapter-07-modules-tooling/01-export-import.ts
//
// Real-world picture: a kitchen with labelled drawers. Spoons live in one drawer,
// knives in another. You open only the drawer you need.

// Named imports: take exactly the pieces you need from lib/geometry.ts
import { circleArea, floorArea, PI_ROUNDED, type Room } from "./lib/geometry.ts";

// Import everything under one name
import * as geometry from "./lib/geometry.ts";

const flat: Room[] = [
  { name: "Living room", width: 4.2, length: 5.0 },
  { name: "Bedroom", width: 3.5, length: 3.8 },
  { name: "Kitchen", width: 2.4, length: 3.0 },
];

console.log("Total floor area:", floorArea(flat), "sq m");
console.log("Round table (r=0.6m):", circleArea(0.6).toFixed(2), "sq m");
console.log("PI rounded:", PI_ROUNDED);
console.log("Via namespace:", geometry.rectangleArea(2, 3));

// round2 was not exported, so it stays private:
// import { round2 } from "./lib/geometry.ts"; // Error: Module has no exported member 'round2'.
