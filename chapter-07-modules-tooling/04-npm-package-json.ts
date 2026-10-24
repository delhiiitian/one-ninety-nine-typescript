// Chapter 7.4 - npm and package.json
// Run: npx tsx chapter-07-modules-tooling/04-npm-package-json.ts
//
// Real-world picture: a recipe card. It lists the dish name, the ingredients
// (dependencies) and the steps (scripts). Anyone can cook the same dish from it.

import { readFileSync } from "node:fs";
import { join } from "node:path";

interface PackageJson {
  name: string;
  version: string;
  type?: string;
  scripts?: Record<string, string>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
}

const pkgPath = join(import.meta.dirname, "..", "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as PackageJson;

console.log(`Project: ${pkg.name} v${pkg.version} (module type: ${pkg.type ?? "commonjs"})`);

console.log("\nScripts (run with `npm run <name>`):");
for (const [name, command] of Object.entries(pkg.scripts ?? {})) {
  console.log(`  ${name.padEnd(10)} -> ${command}`);
}

console.log("\nDev dependencies (tools for building, not shipped to users):");
for (const [name, range] of Object.entries(pkg.devDependencies ?? {})) {
  console.log(`  ${name.padEnd(14)} ${range}  ${explainRange(range)}`);
}

// Version ranges use "semantic versioning": MAJOR.MINOR.PATCH
function explainRange(range: string): string {
  if (range.startsWith("^")) return "(any newer minor/patch, same major)";
  if (range.startsWith("~")) return "(newer patches only)";
  return "(exact version)";
}
