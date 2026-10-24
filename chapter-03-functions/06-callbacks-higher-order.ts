// Chapter 3.6 - Callbacks and higher-order functions
// Run: npx tsx chapter-03-functions/06-callbacks-higher-order.ts
//
// Real-world picture: leaving your number at a busy restaurant.
// "Call me back when a table is free." Your phone number is the callback.

function waitForTable(name: string, onReady: (table: number) => void): void {
  const freeTable = 12; // pretend we looked it up
  console.log(`${name} is waiting...`);
  onReady(freeTable);
}

waitForTable("Gupta family", (table) => {
  console.log(`Table ${table} is ready for the Gupta family.`);
});

// A higher-order function takes or returns another function.
function repeat(times: number, action: (i: number) => void): void {
  for (let i = 1; i <= times; i++) action(i);
}
repeat(3, (i) => console.log(`Reminder #${i}: drink water`));

// Returning a function: a "factory" that builds custom multipliers.
function makeTaxCalculator(ratePercent: number): (amount: number) => number {
  return (amount) => amount * (ratePercent / 100);
}
const gst18 = makeTaxCalculator(18);
const gst5 = makeTaxCalculator(5);
console.log("18% of 1000 =", gst18(1000));
console.log("5% of 1000 =", gst5(1000));

// Built-in higher-order functions you will use every day
const scores = [45, 82, 67, 91, 38];
console.log("Passed:", scores.filter((s) => s >= 50));
console.log("Sorted:", [...scores].sort((a, b) => b - a));
