// Chapter 4.2 - Array methods: map, filter, reduce, find, some, every
// Run: npx tsx chapter-04-data-structures/02-array-methods.ts
//
// Real-world picture: a fruit-processing line.
// filter = remove bad fruit, map = peel each fruit, reduce = blend everything into one jug.

interface Order {
  id: number;
  customer: string;
  amount: number;
  delivered: boolean;
}

const orders: Order[] = [
  { id: 1, customer: "Ana", amount: 450, delivered: true },
  { id: 2, customer: "Ben", amount: 1200, delivered: false },
  { id: 3, customer: "Chitra", amount: 300, delivered: true },
  { id: 4, customer: "Dinesh", amount: 2200, delivered: true },
];

const delivered = orders.filter((o) => o.delivered);
console.log("Delivered order ids:", delivered.map((o) => o.id));

const labels = orders.map((o) => `#${o.id} ${o.customer}: Rs ${o.amount}`);
console.log(labels);

const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
console.log("Total revenue:", revenue);

const bigOrder = orders.find((o) => o.amount > 1000);
console.log("First big order:", bigOrder?.customer);

console.log("Any pending?", orders.some((o) => !o.delivered));
console.log("All above 100?", orders.every((o) => o.amount > 100));

// Chaining: total of delivered orders only
const deliveredRevenue = orders
  .filter((o) => o.delivered)
  .map((o) => o.amount)
  .reduce((a, b) => a + b, 0);
console.log("Delivered revenue:", deliveredRevenue);

// Sort a copy, so the original array keeps its order
const byAmount = [...orders].sort((a, b) => b.amount - a.amount);
console.log("Biggest first:", byAmount.map((o) => o.customer).join(", "));
