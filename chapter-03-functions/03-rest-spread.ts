// Chapter 3.3 - Rest parameters and the spread operator
// Run: npx tsx chapter-03-functions/03-rest-spread.ts
//
// Real-world picture: a cashier scanning items.
// You do not tell the cashier how many items in advance; they scan as many as you bring.

function totalBill(...prices: number[]): number {
  let sum = 0;
  for (const p of prices) sum += p;
  return sum;
}

console.log("Two items:", totalBill(120, 80));
console.log("Five items:", totalBill(10, 20, 30, 40, 50));
console.log("No items:", totalBill());

// A fixed first parameter, then "the rest"
function invite(host: string, ...guests: string[]): string {
  return `${host} invites ${guests.length} people: ${guests.join(", ")}`;
}
console.log(invite("Neha", "Arjun", "Kiran", "Lata"));

// Spread does the opposite: it unpacks an array into separate values.
const weekendSpend = [450, 1200, 300];
console.log("Weekend total:", totalBill(...weekendSpend));
console.log("Highest spend:", Math.max(...weekendSpend));

// Spread also copies and merges arrays.
const morningTasks = ["gym", "breakfast"];
const eveningTasks = ["walk", "dinner"];
const day = [...morningTasks, "work", ...eveningTasks];
console.log("Today:", day);
