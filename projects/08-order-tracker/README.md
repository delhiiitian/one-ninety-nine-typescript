# Project 8: Order Tracker

Chapter 8 project of *The 199 Series: TypeScript*. Tracks online orders through their life
(created, paid, shipped, delivered, cancelled) with a state machine that TypeScript checks:
impossible moves, like shipping an unpaid order, are rejected, and each state carries only
the data that belongs to it.

## Run

```bash
npx tsx projects/08-order-tracker/src/main.ts
```

## Files

| File | Job |
| --- | --- |
| `src/types.ts` | Discriminated unions for states and events, template literal id type |
| `src/machine.ts` | `transition()`: every allowed move in one place; `describe()`, `total()` |
| `src/repository.ts` | Generic `Repository<T>` with a `keyof` constrained query |
| `src/service.ts` | `OrderService`: creates orders, applies events, keeps a log |
| `src/main.ts` | Simulates a day of orders |
