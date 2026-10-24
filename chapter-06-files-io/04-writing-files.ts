// Chapter 6.4 - Writing and appending files
// Run: npx tsx chapter-06-files-io/04-writing-files.ts
//
// Real-world picture: a diary. Writing a new diary replaces everything (write),
// while adding today's entry keeps the old pages (append).

import { writeFile, appendFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(import.meta.dirname, "output");
await mkdir(outDir, { recursive: true }); // make sure the folder exists
const diaryPath = join(outDir, "diary.txt");

// writeFile creates the file, or replaces it if it exists.
await writeFile(diaryPath, "My coding diary\n===============\n", "utf8");

// appendFile adds to the end.
const entries = [
  "Day 1: printed Hello, TypeScript!",
  "Day 2: learned let and const",
  "Day 3: wrote my first function",
];
for (const entry of entries) {
  await appendFile(diaryPath, entry + "\n", "utf8");
}

console.log(await readFile(diaryPath, "utf8"));

// Writing a simple report built from data
const expenses = { rent: 15000, food: 6000, travel: 2500 };
const report = Object.entries(expenses)
  .map(([category, amount]) => `${category.padEnd(8)} Rs ${amount}`)
  .join("\n");
const reportPath = join(outDir, "expenses.txt");
await writeFile(reportPath, report + "\n", "utf8");
console.log("Report saved to", reportPath);
