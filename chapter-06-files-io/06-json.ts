// Chapter 6.6 - JSON: saving and loading structured data
// Run: npx tsx chapter-06-files-io/06-json.ts
//
// Real-world picture: packing furniture flat for shipping. stringify flat-packs
// an object into text; parse assembles it again at the other end.

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

interface Settings {
  theme: "light" | "dark";
  fontSize: number;
  recentFiles: string[];
}

const settings: Settings = { theme: "dark", fontSize: 16, recentFiles: ["notes.md", "todo.txt"] };

// Object -> text. The 2 adds indentation so humans can read it.
const text = JSON.stringify(settings, null, 2);
console.log("As JSON text:\n" + text);

const outDir = join(import.meta.dirname, "output");
await mkdir(outDir, { recursive: true });
const file = join(outDir, "settings.json");
await writeFile(file, text, "utf8");

// Text -> object. JSON.parse returns `any`, so we check the shape before trusting it.
const loaded: unknown = JSON.parse(await readFile(file, "utf8"));

function isSettings(value: unknown): value is Settings {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.theme === "light" || v.theme === "dark") &&
    typeof v.fontSize === "number" &&
    Array.isArray(v.recentFiles)
  );
}

if (isSettings(loaded)) {
  console.log(`Loaded: theme=${loaded.theme}, font=${loaded.fontSize}px, ${loaded.recentFiles.length} recent files`);
} else {
  console.log("Settings file is damaged, using defaults");
}

// Note: JSON has no Dates, Maps or functions. Dates become strings.
console.log(JSON.stringify({ savedAt: new Date("2026-10-24T09:00:00Z") }));
