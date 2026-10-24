// Chapter 7.7 - Declaration files (.d.ts) for JavaScript code
// Run: npx tsx chapter-07-modules-tooling/07-declaration-files.ts
//
// Real-world picture: an English menu card in a restaurant abroad. The kitchen
// (JavaScript) does not change, but now you can understand what to order.

// lib/legacy-tax.js is plain JavaScript. lib/legacy-tax.d.ts describes its types.
import { incomeTax, TAX_YEAR } from "./lib/legacy-tax.js";

for (const income of [250_000, 600_000, 1_500_000]) {
  console.log(`Tax year ${TAX_YEAR}: income Rs ${income.toLocaleString("en-IN")} -> tax Rs ${incomeTax(income)}`);
}

// Thanks to the .d.ts file, mistakes are caught even though the code is JavaScript:
// incomeTax("ten lakh"); // Error: Argument of type 'string' is not assignable to 'number'.

// Most npm packages ship their own .d.ts files. For those that do not,
// the community publishes them as @types/<package>, e.g. `npm i -D @types/node`.
const fromTypesNode: NodeJS.Platform = process.platform; // type comes from @types/node
console.log("Platform type comes from @types/node:", fromTypesNode);
