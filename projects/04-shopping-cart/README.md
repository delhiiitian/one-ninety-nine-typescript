# Project 4: Shopping Cart

Chapter 4 project of *The 199 Series: TypeScript*. An online-shop cart with a product
catalog, stock limits, coupons and a printed receipt, built from Maps, Sets, interfaces and arrays.

## Run

```bash
npx tsx projects/04-shopping-cart/src/main.ts
```

## Files

| File | Job |
| --- | --- |
| `src/catalog.ts` | Products and a `Map` from SKU to product |
| `src/coupons.ts` | Coupon rules as objects with a `discount` function |
| `src/cart.ts` | The `Cart` class: add, remove, apply coupon, summary |
| `src/receipt.ts` | Formats a summary as a receipt |
| `src/main.ts` | A scripted shopping session |
