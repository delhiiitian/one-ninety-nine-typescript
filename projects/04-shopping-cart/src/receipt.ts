// Turns a CartSummary into printable text. Kept separate so the format can change freely.

import type { CartSummary } from "./cart.ts";

const rs = (n: number) => `Rs ${n.toLocaleString("en-IN")}`;
const row = (left: string, right: string) => left.padEnd(34) + right.padStart(12);

export function renderReceipt({ lines, subtotal, discounts, delivery, total }: CartSummary): string {
  const out: string[] = ["RECEIPT".padStart(26), "=".repeat(46)];
  for (const { product, quantity, lineTotal } of lines) {
    out.push(row(`${quantity} x ${product.name}`, rs(lineTotal)));
  }
  out.push("-".repeat(46), row("Subtotal", rs(subtotal)));
  for (const [code, amount] of discounts) {
    out.push(row(`Coupon ${code}`, amount > 0 ? `-${rs(amount)}` : "not eligible"));
  }
  out.push(row("Delivery", delivery === 0 ? "FREE" : rs(delivery)));
  out.push("=".repeat(46), row("TOTAL", rs(total)));
  return out.join("\n");
}
