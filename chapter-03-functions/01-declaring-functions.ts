// Chapter 3.1 - Declaring functions with typed parameters and return types
// Run: npx tsx chapter-03-functions/01-declaring-functions.ts
//
// Real-world picture: a juicer. You put in fruit (inputs), press the button,
// and get juice (output). The label says which fruit it accepts.

function calculateEmi(principal: number, annualRatePercent: number, months: number): number {
  const monthlyRate = annualRatePercent / 12 / 100;
  const growth = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * growth) / (growth - 1);
}

const emi = calculateEmi(500_000, 9, 60);
console.log(`Car loan EMI: Rs ${emi.toFixed(2)} per month`);

// A function that returns text
function formatRupees(amount: number): string {
  return "Rs " + amount.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
console.log(formatRupees(1234567.891));

// A function that returns nothing uses `void`.
function printReceipt(item: string, price: number): void {
  console.log(`${item.padEnd(12, ".")} ${formatRupees(price)}`);
}
printReceipt("Headphones", 2999);
printReceipt("Charger", 799);

// TypeScript checks every call:
// calculateEmi("500000", 9, 60); // Error: Argument of type 'string' is not assignable to 'number'.
// calculateEmi(500000, 9);       // Error: Expected 3 arguments, but got 2.
