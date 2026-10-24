// Chapter 6.7 - Reading CSV files
// Run: npx tsx chapter-06-files-io/07-csv.ts
//
// Real-world picture: a shop's sales register. Each line is one sale, and the
// columns are always in the same order: date, product, quantity, price.

import { readFileSync } from "node:fs";
import { join } from "node:path";

interface Sale {
  date: string;
  product: string;
  quantity: number;
  unitPrice: number;
}

const text = readFileSync(join(import.meta.dirname, "data", "sales.csv"), "utf8");
const [header, ...rows] = text.trim().split("\n");
console.log("Columns:", header.split(","));

const sales: Sale[] = rows.map((line) => {
  const [date, product, quantity, unitPrice] = line.split(",");
  return { date, product, quantity: Number(quantity), unitPrice: Number(unitPrice) };
});

// Revenue per product
const revenueByProduct = new Map<string, number>();
for (const s of sales) {
  const revenue = s.quantity * s.unitPrice;
  revenueByProduct.set(s.product, (revenueByProduct.get(s.product) ?? 0) + revenue);
}

console.log("\nRevenue by product:");
for (const [product, revenue] of [...revenueByProduct].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${product.padEnd(14)} Rs ${revenue}`);
}

const total = [...revenueByProduct.values()].reduce((a, b) => a + b, 0);
console.log(`  ${"TOTAL".padEnd(14)} Rs ${total}`);

// Writing CSV is just joining with commas and newlines.
const summaryCsv = ["product,revenue", ...[...revenueByProduct].map(([p, r]) => `${p},${r}`)].join("\n");
console.log("\nSummary as CSV:\n" + summaryCsv);
// Note: real CSV can contain commas inside quotes. For that, use a library such as csv-parse.
