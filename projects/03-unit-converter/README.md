# Project 3: Unit Converter

Chapter 3 project of *The 199 Series: TypeScript*. Converts length, weight, volume and
temperature, using a table of small functions instead of long if/else chains.

## Run

```bash
npx tsx projects/03-unit-converter/src/main.ts "10 km to mi"
npx tsx projects/03-unit-converter/src/main.ts "98.6 f in c"
npx tsx projects/03-unit-converter/src/main.ts          # demo
```

## Files

| File | Job |
| --- | --- |
| `src/units.ts` | The unit table: each unit has `toBase` and `fromBase` functions |
| `src/converter.ts` | Finds units, checks categories, converts, parses "10 km to mi" |
| `src/main.ts` | Command-line interface and demo |
