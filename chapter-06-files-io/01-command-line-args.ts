// Chapter 6.1 - Reading command-line arguments
// Run: npx tsx chapter-06-files-io/01-command-line-args.ts Asha 3 --loud
//
// Real-world picture: giving instructions to a taxi driver as you get in.
// "Airport, please, and take the highway." The trip starts with those details.

import { parseArgs } from "node:util";

// process.argv = [path to node, path to this script, ...your words]
const args = process.argv.slice(2);
console.log("Raw arguments:", args);

// Separate flags (starting with --) from plain values
const flags = args.filter((a) => a.startsWith("--"));
const values = args.filter((a) => !a.startsWith("--"));

const name = values[0] ?? "friend";
const times = Number(values[1] ?? 1);
const loud = flags.includes("--loud");

if (!Number.isInteger(times) || times < 1) {
  console.log("Usage: 01-command-line-args.ts <name> <times> [--loud]");
  process.exitCode = 1; // a non-zero exit code tells other tools that something failed
} else {
  for (let i = 0; i < times; i++) {
    const greeting = `Hello, ${name}!`;
    console.log(loud ? greeting.toUpperCase() : greeting);
  }
}

// Node also has a built-in parser for --name=value style options.
const { values: options } = parseArgs({
  args: ["--city", "Kochi", "--days", "4"],
  options: { city: { type: "string" }, days: { type: "string" } },
});
console.log(`Trip plan: ${options.days} days in ${options.city}`);
