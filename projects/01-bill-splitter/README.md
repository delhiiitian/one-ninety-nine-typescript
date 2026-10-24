# Project 1: Bill Splitter

Chapter 1 project of *The 199 Series: TypeScript*. Splits a restaurant bill between friends,
with tax and tip, and makes sure the shares add up to the total to the last paisa.

## Run

```bash
npx tsx projects/01-bill-splitter/src/main.ts 2450 10 4 5
#                                              amount tip% people tax%
```

## Files

| File | Job |
| --- | --- |
| `src/money.ts` | Converts rupees to paise (whole numbers) and formats money |
| `src/bill.ts` | Validates input and does every calculation; no printing |
| `src/main.ts` | Reads command-line arguments and prints the receipt |

## Ideas to extend

- Let one person pay for an extra item.
- Ask the questions interactively (see Chapter 6.2).
