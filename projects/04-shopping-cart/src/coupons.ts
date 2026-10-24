// Coupons: each one is a small rule object. Applied coupons are tracked in a Set.

import type { Category } from "./catalog.ts";

export interface Coupon {
  code: string;
  description: string;
  minSubtotal: number;
  // Returns the discount in rupees for the given cart lines.
  discount(lines: ReadonlyArray<{ category: Category; lineTotal: number }>, subtotal: number): number;
}

export const coupons: Coupon[] = [
  {
    code: "WELCOME100",
    description: "Rs 100 off orders above Rs 999",
    minSubtotal: 1000,
    discount: () => 100,
  },
  {
    code: "BOOKS20",
    description: "20% off all books",
    minSubtotal: 0,
    discount: (lines) =>
      Math.round(lines.filter((l) => l.category === "books").reduce((sum, l) => sum + l.lineTotal, 0) * 0.2),
  },
  {
    code: "TECH5",
    description: "5% off electronics, max Rs 150",
    minSubtotal: 0,
    discount: (lines) =>
      Math.min(150, Math.round(lines.filter((l) => l.category === "electronics").reduce((s, l) => s + l.lineTotal, 0) * 0.05)),
  },
];

export const couponByCode = new Map(coupons.map((c) => [c.code, c]));
