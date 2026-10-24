// Chapter 5.8 - Assertion functions
// Run: npx tsx chapter-05-error-handling/08-assertion-functions.ts
//
// Real-world picture: a pilot's pre-flight checklist. If any check fails, the plane
// does not take off. If all pass, everyone can trust the plane is ready.

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

function assertIsString(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string") throw new TypeError(`${name} must be a string`);
}

interface FlightPlan {
  flightNo: string;
  fuelKg: number;
  passengers: number;
}

function preflightCheck(plan: FlightPlan): void {
  assert(plan.fuelKg >= 2000, "not enough fuel");
  assert(plan.passengers <= 180, "too many passengers");
  console.log(`${plan.flightNo}: all checks passed, ready for take-off`);
}

for (const plan of [
  { flightNo: "AI-101", fuelKg: 5200, passengers: 150 },
  { flightNo: "AI-202", fuelKg: 800, passengers: 120 },
]) {
  try {
    preflightCheck(plan);
  } catch (e) {
    console.log(`${plan.flightNo}: ${(e as Error).message}`);
  }
}

// After an assertion, TypeScript knows more about the value.
const raw: unknown = JSON.parse('"Gate 14"');
assertIsString(raw, "gate");
console.log("Gate in capitals:", raw.toUpperCase()); // allowed: raw is now a string
