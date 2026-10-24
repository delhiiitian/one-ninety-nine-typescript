// Chapter 8.5 - Generic functions
// Run: npx tsx chapter-08-typescript-strengths/05-generic-functions.ts
//
// Real-world picture: a gift box. The same box can hold a watch, a book or a toy.
// Whatever goes in is exactly what comes out; the box remembers what it holds.

// T is a "type parameter": a placeholder filled in when the function is used.
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstCity = firstItem(["Delhi", "Mumbai"]); // T = string
const firstPrice = firstItem([199, 499]);          // T = number
console.log(firstCity?.toUpperCase(), (firstPrice ?? 0) + 1);

// Two type parameters
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = pair("seat", 14);
console.log("Pair:", p);

// A generic helper used in real apps: group items by a key
function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const key = getKey(item);
    (groups[key] ??= []).push(item);
  }
  return groups;
}

const employees = [
  { name: "Ira", team: "design" },
  { name: "Om", team: "backend" },
  { name: "Lea", team: "design" },
];
const byTeam = groupBy(employees, (e) => e.team);
console.log("Designers:", byTeam.design.map((e) => e.name));

// Without generics we would need `any`, and lose all type checking:
function firstAny(items: any[]): any {
  return items[0];
}
const lost = firstAny(["Delhi"]); // type is any: typos are no longer caught
console.log("any version:", lost);
