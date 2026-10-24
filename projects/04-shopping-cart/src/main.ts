// Shopping Cart - a scripted shopping session
// Run: npx tsx projects/04-shopping-cart/src/main.ts

import { Cart } from "./cart.ts";
import { productsIn } from "./catalog.ts";
import { renderReceipt } from "./receipt.ts";

console.log("Books on sale:", productsIn("books").map((p) => p.name));

const cart = new Cart();
const actions: Array<() => string> = [
  () => cart.add("GR-RICE-5"),
  () => cart.add("EL-EARBUDS"),
  () => cart.add("EL-EARBUDS", 10),     // more than in stock
  () => cart.add("BK-TS199", 2),
  () => cart.add("XX-UNKNOWN"),
  () => cart.add("EL-CABLE", 3),
  () => cart.remove("EL-CABLE", 1),
  () => cart.applyCoupon("welcome100"),
  () => cart.applyCoupon("BOOKS20"),
  () => cart.applyCoupon("BOOKS20"),    // duplicate
  () => cart.applyCoupon("FREEMONEY"),
];

for (const action of actions) console.log("> " + action());

console.log("\n" + renderReceipt(cart.summary()));
