// Chapter 7.5 - tsconfig.json: the compiler's settings
// Run: npx tsx chapter-07-modules-tooling/05-tsconfig.ts
//
// Real-world picture: the settings panel of a car. You choose the driving mode
// (eco/sport), the safety alerts (strict), and the language of the display (target).

import { readFileSync } from "node:fs";
import { join } from "node:path";

const config = JSON.parse(readFileSync(join(import.meta.dirname, "..", "tsconfig.json"), "utf8")) as {
  compilerOptions: Record<string, unknown>;
  include: string[];
};

const explanations: Record<string, string> = {
  target: "which JavaScript version to output",
  module: "how import/export is written in the output",
  moduleResolution: "how import paths are found",
  lib: "which built-in APIs exist (ES2023, browser DOM)",
  types: "which @types packages to load (Node.js)",
  strict: "turn on all the safety checks (always use this)",
  esModuleInterop: "smoother imports of older CommonJS packages",
  skipLibCheck: "do not re-check library .d.ts files (faster)",
  rewriteRelativeImportExtensions: "turn './x.ts' imports into './x.js' when compiling",
  outDir: "where compiled .js files go",
  rootDir: "the top folder of your source files",
};

console.log("This repo's compiler options:");
for (const [key, value] of Object.entries(config.compilerOptions)) {
  console.log(`  ${key.padEnd(34)} ${JSON.stringify(value).padEnd(18)} ${explanations[key] ?? ""}`);
}
console.log("Files checked:", config.include.join(", "));

// What "strict" buys you, in one example:
function shout(message?: string): string {
  // Without strict, `message.toUpperCase()` compiles and crashes when message is undefined.
  return (message ?? "nothing to say").toUpperCase();
}
console.log(shout(), "|", shout("hello"));
