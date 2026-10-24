// Chapter 8.6 - Generic types and constraints
// Run: npx tsx chapter-08-typescript-strengths/06-generic-types-constraints.ts
//
// Real-world picture: a ride-share app's "vehicle" slot. It accepts any vehicle,
// as long as it has seats and a licence plate. That rule is a constraint.

// A generic interface: an API response wrapping any kind of data
interface ApiResponse<T> {
  ok: boolean;
  data: T;
  fetchedAt: string;
}

const weather: ApiResponse<{ city: string; tempC: number }> = {
  ok: true,
  data: { city: "Shimla", tempC: 9 },
  fetchedAt: "08:00",
};
console.log(`${weather.data.city}: ${weather.data.tempC}°C`);

// A generic class: a simple typed queue
class Queue<T> {
  private items: T[] = [];
  enqueue(item: T): void { this.items.push(item); }
  dequeue(): T | undefined { return this.items.shift(); }
  get size(): number { return this.items.length; }
}

const printQueue = new Queue<string>();
printQueue.enqueue("report.pdf");
printQueue.enqueue("invoice.pdf");
console.log("Printing:", printQueue.dequeue(), "| still waiting:", printQueue.size);

// Constraint: T must have a `length` property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
console.log("Longest word:", longest("monsoon", "rain"));
console.log("Longest list:", longest([1, 2, 3], [4]));
// longest(10, 20); // Error: Argument of type 'number' does not satisfy the constraint.

// keyof constraint: only real property names allowed
function getField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const car = { brand: "Tata", model: "Nexon", year: 2024 };
console.log("Model:", getField(car, "model"), "| Year:", getField(car, "year"));
// getField(car, "colour"); // Error: '"colour"' is not assignable to '"brand" | "model" | "year"'.
