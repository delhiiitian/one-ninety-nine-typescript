// Chapter 9.9 - Events with EventEmitter
// Run: npx tsx chapter-09-real-world/09-events.ts
//
// Real-world picture: a school bell. The bell rings once, and every class that
// is listening reacts in its own way: one goes to lunch, one goes home.

import { EventEmitter } from "node:events";

// Describe each event and the data it carries, so listeners are type-checked.
type ShopEvents = {
  orderPlaced: [orderId: string, amount: number];
  outOfStock: [product: string];
};

const shop = new EventEmitter<ShopEvents>();

// Several independent listeners for the same event
shop.on("orderPlaced", (orderId, amount) => {
  console.log(`[email]     Receipt for ${orderId}: Rs ${amount}`);
});
shop.on("orderPlaced", (orderId) => {
  console.log(`[warehouse] Pack order ${orderId}`);
});
shop.on("orderPlaced", (_orderId, amount) => {
  if (amount > 5000) console.log("[loyalty]   Bonus points added");
});

// once: react only the first time
shop.once("outOfStock", (product) => {
  console.log(`[buyer]     Reorder ${product} (alert sent once)`);
});

// The code that emits events does not need to know who is listening.
function placeOrder(orderId: string, amount: number): void {
  console.log(`\nOrder ${orderId} placed`);
  shop.emit("orderPlaced", orderId, amount);
}

placeOrder("A-100", 1200);
placeOrder("A-101", 7800);
shop.emit("outOfStock", "Phone case");
shop.emit("outOfStock", "Phone case"); // no output: the once listener is gone

console.log("\nListeners on orderPlaced:", shop.listenerCount("orderPlaced"));
// shop.emit("orderPlaced", "A-102"); // Error: Expected 3 arguments, but got 2.
