// Bank Account Simulator - runs a file of commands and reports every outcome
// Run: npx tsx projects/05-bank-account-simulator/src/main.ts [commands-file]

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Bank } from "./bank.ts";

const file = process.argv[2] ?? join(import.meta.dirname, "..", "data", "commands.txt");

let text: string;
try {
  text = readFileSync(file, "utf8");
} catch (error) {
  console.error(`Cannot read ${file}: ${(error as Error).message}`);
  process.exit(1);
}

const bank = new Bank();
bank.open("A1", "Anita");
bank.open("B2", "Bilal");

const failuresByKind = new Map<string, number>();
const commands = text.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

for (const [i, command] of commands.entries()) {
  const result = bank.run(command);
  const n = String(i + 1).padStart(2);
  if (result.ok) {
    console.log(`${n}. OK    ${result.message}`);
  } else {
    console.log(`${n}. FAIL  ${command.padEnd(22)} -> ${result.kind}: ${result.error}`);
    failuresByKind.set(result.kind, (failuresByKind.get(result.kind) ?? 0) + 1);
  }
}

console.log("\nStatement:");
for (const line of bank.statement()) console.log("  " + line);
console.log("\nFailures by type:", Object.fromEntries(failuresByKind));
