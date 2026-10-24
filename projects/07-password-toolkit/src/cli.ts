// Password Toolkit CLI
//   npx tsx projects/07-password-toolkit/src/cli.ts generate --length=16 --no-symbols
//   npx tsx projects/07-password-toolkit/src/cli.ts phrase --words=5
//   npx tsx projects/07-password-toolkit/src/cli.ts check "MyP@ssw0rd"

import { parseArgs } from "node:util";
import { checkStrength, generatePassphrase, generatePassword } from "./index.ts";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    length: { type: "string", default: "16" },
    words: { type: "string", default: "4" },
    "no-symbols": { type: "boolean", default: false },
    "no-digits": { type: "boolean", default: false },
  },
});

const [command = "generate", text] = positionals;

function report(password: string): void {
  const { score, rating, tips } = checkStrength(password);
  const bar = "#".repeat(Math.round(score / 5)).padEnd(20, ".");
  console.log(`${password}\n  [${bar}] ${score}/100 ${rating}`);
  for (const tip of tips) console.log("  - " + tip);
}

try {
  switch (command) {
    case "generate":
      report(generatePassword({
        length: Number(values.length),
        symbols: !values["no-symbols"],
        digits: !values["no-digits"],
      }));
      break;
    case "phrase":
      report(generatePassphrase(Number(values.words)));
      break;
    case "check":
      if (!text) throw new Error('Usage: check "<password>"');
      report(text);
      break;
    default:
      throw new Error(`Unknown command "${command}". Use generate, phrase or check.`);
  }
} catch (error) {
  console.error("Error:", (error as Error).message);
  process.exitCode = 1;
}
