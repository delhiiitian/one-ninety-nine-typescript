// Bill Splitter - command-line entry point
// Run: npx tsx projects/01-bill-splitter/src/main.ts <amount> [tip%] [people] [tax%]
// Example: npx tsx projects/01-bill-splitter/src/main.ts 2450 10 4 5

import { splitBill, validate } from "./bill.ts";
import { formatRupees, toPaise } from "./money.ts";

const [amountArg = "2450", tipArg = "10", peopleArg = "4", taxArg = "5"] = process.argv.slice(2);

const input = {
  subtotal: toPaise(Number(amountArg)),
  tipPercent: Number(tipArg),
  people: Number(peopleArg),
  taxPercent: Number(taxArg),
};

const problems = validate(input);
if (problems.length > 0) {
  console.log("Cannot split this bill:");
  for (const p of problems) console.log("  - " + p);
  console.log("Usage: main.ts <amount> [tip%] [people] [tax%]");
  process.exit(1);
}

const bill = splitBill(input);
const line = (label: string, value: string) => console.log(label.padEnd(18) + value.padStart(14));

console.log("========= BILL SPLITTER =========");
line("Subtotal", formatRupees(bill.subtotal));
line(`Tax (${input.taxPercent}%)`, formatRupees(bill.tax));
line(`Tip (${input.tipPercent}%)`, formatRupees(bill.tip));
console.log("-".repeat(32));
line("Total", formatRupees(bill.total));
console.log("-".repeat(32));
bill.shares.forEach((share, i) => line(`Person ${i + 1}`, formatRupees(share)));

const allSame = bill.shares.every((s) => s === bill.shares[0]);
if (!allSame) console.log("(Some people pay 1 paisa more so the total is exact.)");
