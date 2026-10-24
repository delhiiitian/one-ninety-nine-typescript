// Unit Converter
// Run: npx tsx projects/03-unit-converter/src/main.ts "10 km to mi"
// With no argument, it runs a short demo.

import { convert, makeConverter, parseQuery, round } from "./converter.ts";
import { UNITS } from "./units.ts";

function answer(query: string): string {
  const parsed = parseQuery(query);
  if (!parsed) return `Could not understand "${query}". Try: 10 km to mi`;
  const [value, from, to] = parsed;
  const result = convert(value, from, to);
  return result.ok
    ? `${value} ${result.from.name} = ${round(result.value)} ${result.to.name}`
    : `Error: ${result.error}`;
}

const query = process.argv.slice(2).join(" ");

if (query) {
  console.log(answer(query));
} else {
  for (const q of ["10 km to mi", "98.6 f to c", "5 lb in kg", "2 gal to l", "3 kg to m", "hello"]) {
    console.log(answer(q));
  }

  // makeConverter in action: convert a whole running log at once
  const kmToMiles = makeConverter("km", "mi");
  const runsKm = [5, 10, 21.1, 42.2];
  console.log("\nRuns in miles:", runsKm.map((km) => round(kmToMiles(km), 2)));

  console.log("\nSupported units:", Object.keys(UNITS).join(", "));
}
