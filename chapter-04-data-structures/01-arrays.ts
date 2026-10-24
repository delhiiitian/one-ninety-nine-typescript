// Chapter 4.1 - Arrays
// Run: npx tsx chapter-04-data-structures/01-arrays.ts
//
// Real-world picture: a train. Coaches are joined in order, numbered from the engine,
// and you can add or remove coaches at either end.

const playlist: string[] = ["Intro", "Sunrise", "Monsoon"];
const ratings: number[] = [4, 5, 3];

console.log("First song:", playlist[0]);           // positions start at 0
console.log("Last song:", playlist[playlist.length - 1]);
console.log("Number of songs:", playlist.length);

playlist.push("Night Drive");       // add to the end
playlist.unshift("Welcome");        // add to the start
console.log("After adding:", playlist);

const removedLast = playlist.pop();   // remove from the end
const removedFirst = playlist.shift(); // remove from the start
console.log("Removed:", removedFirst, "and", removedLast);

console.log("Has 'Monsoon'?", playlist.includes("Monsoon"));
console.log("Position of 'Sunrise':", playlist.indexOf("Sunrise"));

// Change an item in place
playlist[1] = "Sunrise (Remix)";
console.log("Updated:", playlist);

// Type safety: only numbers allowed in ratings.
// ratings.push("five"); // Error: Argument of type 'string' is not assignable to 'number'.
ratings.push(5);
console.log("Ratings:", ratings);

// Arrays of arrays: a 3 x 3 tic-tac-toe board
const board: string[][] = [
  ["X", "O", "X"],
  [" ", "X", "O"],
  ["O", " ", "X"],
];
console.log(board.map((row) => row.join(" | ")).join("\n---------\n"));
