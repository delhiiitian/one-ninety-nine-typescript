// Chapter 6.8 - Working with folders
// Run: npx tsx chapter-06-files-io/08-directories.ts
//
// Real-world picture: tidying a messy desk drawer. You look at everything inside,
// make labelled boxes, and sort each item into the right box.

import { mkdir, readdir, writeFile, stat, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";

const desk = join(import.meta.dirname, "output", "messy-desk");
await rm(desk, { recursive: true, force: true }); // start fresh each run
await mkdir(desk, { recursive: true });

// Create some sample files
for (const name of ["holiday.jpg", "budget.xlsx", "notes.txt", "selfie.png", "todo.txt"]) {
  await writeFile(join(desk, name), `sample content of ${name}`);
}

// List what is inside
const files = await readdir(desk);
console.log("Before:", files);

// Sort files into folders by type
const folderFor: Record<string, string> = { ".jpg": "images", ".png": "images", ".txt": "text" };
for (const file of files) {
  const folder = folderFor[extname(file)] ?? "other";
  const target = join(desk, folder);
  if (!existsSync(target)) await mkdir(target);
  await writeFile(join(target, file), `moved ${file}`);
  await rm(join(desk, file));
}

// Show the result, with sizes
for (const entry of await readdir(desk, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    const inside = await readdir(join(desk, entry.name));
    console.log(`[${entry.name}] ${inside.join(", ")}`);
  }
}
const info = await stat(join(desk, "text", "notes.txt"));
console.log("notes.txt size in bytes:", info.size);
