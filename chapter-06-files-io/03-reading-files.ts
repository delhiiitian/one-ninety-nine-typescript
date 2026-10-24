// Chapter 6.3 - Reading a text file
// Run: npx tsx chapter-06-files-io/03-reading-files.ts
//
// Real-world picture: borrowing a book from a library. You find it on the shelf
// (the path), open it, and read the pages (the contents).

import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const poemPath = join(import.meta.dirname, "data", "poem.txt");

// 1. Synchronous: simple, but the program waits while reading. Fine for small scripts.
const poem = readFileSync(poemPath, "utf8");
console.log("--- Whole file ---");
console.log(poem.trim());

// 2. Split into lines and count words
const lines = poem.trim().split("\n");
const words = poem.split(/\s+/).filter(Boolean);
console.log(`\nLines: ${lines.length}, words: ${words.length}`);

// 3. Asynchronous: the program can do other work while the disk is busy.
const again = await readFile(poemPath, "utf8");
console.log("First line (async):", again.split("\n")[0]);

// 4. A file that does not exist throws an error with a code.
try {
  await readFile(join(import.meta.dirname, "data", "missing.txt"), "utf8");
} catch (error) {
  const code = (error as NodeJS.ErrnoException).code;
  console.log("Could not read missing.txt, error code:", code); // ENOENT = "no such file"
}
