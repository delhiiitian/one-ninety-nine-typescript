// Chapter 3.8 - Recursion
// Run: npx tsx chapter-03-functions/08-recursion.ts
//
// Real-world picture: Russian nesting dolls. To find the smallest doll you open
// one doll, then do the same thing again on the doll inside, until there is no doll left.

function openDoll(level: number): string {
  if (level === 1) {
    return "Found the tiny doll!"; // base case: stops the recursion
  }
  console.log(`Opening doll ${level}...`);
  return openDoll(level - 1); // recursive case: a smaller problem
}
console.log(openDoll(4));

// Factorial: 5! = 5 x 4 x 3 x 2 x 1
function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
console.log("5! =", factorial(5));

// Real use: walking a folder tree of unknown depth.
interface Folder {
  name: string;
  files: number;
  subfolders: Folder[];
}

function countFiles(folder: Folder): number {
  let total = folder.files;
  for (const sub of folder.subfolders) {
    total += countFiles(sub);
  }
  return total;
}

const photos: Folder = {
  name: "Photos",
  files: 3,
  subfolders: [
    { name: "2023", files: 120, subfolders: [{ name: "Goa trip", files: 45, subfolders: [] }] },
    { name: "2024", files: 88, subfolders: [] },
  ],
};
console.log("Total photos:", countFiles(photos));
