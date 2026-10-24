// The cart: quantities in a Map, coupon codes in a Set, totals computed on demand.

import { catalog, type Product } from "./catalog.ts";
import { couponByCode } from "./coupons.ts";

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartSummary {
  lines: CartLine[];
  subtotal: number;
  discounts: Array<[code: string, amount: number]>;
  delivery: number;
  total: number;
}

const FREE_DELIVERY_FROM = 499;
const DELIVERY_FEE = 40;

export class Cart {
  private quantities = new Map<string, number>();
  private appliedCoupons = new Set<string>();

  add(sku: string, quantity = 1): string {
    const product = catalog.get(sku);
    if (!product) return `No product with SKU ${sku}`;
    const wanted = (this.quantities.get(sku) ?? 0) + quantity;
    if (wanted > product.stock) return `Only ${product.stock} x ${product.name} in stock`;
    this.quantities.set(sku, wanted);
    return `Added ${quantity} x ${product.name}`;
  }

  remove(sku: string, quantity = 1): string {
    const current = this.quantities.get(sku) ?? 0;
    if (current === 0) return `${sku} is not in the cart`;
    const left = current - quantity;
    if (left <= 0) this.quantities.delete(sku);
    else this.quantities.set(sku, left);
    return `Removed ${Math.min(quantity, current)} x ${sku}`;
  }

  applyCoupon(code: string): string {
    const coupon = couponByCode.get(code.toUpperCase());
    if (!coupon) return `Coupon ${code} does not exist`;
    if (this.appliedCoupons.has(coupon.code)) return `Coupon ${coupon.code} is already applied`;
    this.appliedCoupons.add(coupon.code);
    return `Applied ${coupon.code}: ${coupon.description}`;
  }

  summary(): CartSummary {
    const lines: CartLine[] = [];
    for (const [sku, quantity] of this.quantities) {
      const product = catalog.get(sku)!; // add() only stores SKUs that exist
      lines.push({ product, quantity, lineTotal: product.price * quantity });
    }
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

    const flatLines = lines.map((l) => ({ category: l.product.category, lineTotal: l.lineTotal }));
    const discounts: Array<[string, number]> = [];
    for (const code of this.appliedCoupons) {
      const coupon = couponByCode.get(code)!;
      const amount = subtotal >= coupon.minSubtotal ? coupon.discount(flatLines, subtotal) : 0;
      discounts.push([code, amount]);
    }
    const totalDiscount = discounts.reduce((sum, [, amount]) => sum + amount, 0);
    const afterDiscount = Math.max(0, subtotal - totalDiscount);
    const delivery = afterDiscount === 0 || afterDiscount >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;

    return { lines, subtotal, discounts, delivery, total: afterDiscount + delivery };
  }
}
