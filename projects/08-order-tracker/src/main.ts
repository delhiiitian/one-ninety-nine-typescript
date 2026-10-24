// Order Tracker - simulates a day at an online shop
// Run: npx tsx projects/08-order-tracker/src/main.ts

import { describe, total } from "./machine.ts";
import { OrderService } from "./service.ts";

const shop = new OrderService();

const a = shop.create("Asha", [{ name: "Kurta", quantity: 2, price: 899 }]);
const b = shop.create("Bob", [{ name: "Headphones", quantity: 1, price: 2499 }]);
const c = shop.create("Chen", [{ name: "Notebook", quantity: 5, price: 60 }]);
const d = shop.create("Divya", [{ name: "Saree", quantity: 1, price: 3499 }]);

const steps: Array<[typeof a.id, Parameters<OrderService["apply"]>[1]]> = [
  [a.id, { type: "pay", paymentId: "PAY-1" }],
  [a.id, { type: "ship", trackingNo: "TRK-555" }],
  [a.id, { type: "deliver", at: "2026-10-24 16:20" }],
  [b.id, { type: "ship", trackingNo: "TRK-999" }],      // not paid yet: rejected
  [b.id, { type: "pay", paymentId: "PAY-2" }],
  [b.id, { type: "cancel", reason: "changed mind" }],   // paid: refund issued
  [c.id, { type: "cancel", reason: "out of stock" }],
  [c.id, { type: "pay", paymentId: "PAY-3" }],          // cancelled: rejected
  [d.id, { type: "pay", paymentId: "PAY-4" }],
  [a.id, { type: "cancel", reason: "too late" }],       // delivered: rejected
];

console.log("Events:");
for (const [id, event] of steps) console.log("  " + shop.apply(id, event));

console.log("\nOrders:");
for (const order of shop.all()) {
  console.log(`  ${order.id} ${order.customer.padEnd(6)} Rs ${String(total(order.state)).padStart(5)}  ${describe(order.state)}`);
}

console.log("\nBy status:", shop.countByStatus());
console.log("History of", a.id + ":", shop.get(a.id)?.log.map((l) => `${l.from}->${l.to}`).join(", "));
