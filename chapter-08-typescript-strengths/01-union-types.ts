// Chapter 8.1 - Union types: "this OR that"
// Run: npx tsx chapter-08-typescript-strengths/01-union-types.ts
//
// Real-world picture: a parking machine that accepts coins OR a card.
// Both are fine, but it handles each one differently.

type PaymentInput = number | string; // coins (amount) or a card number

function pay(input: PaymentInput): string {
  if (typeof input === "number") {
    return `Paid Rs ${input} in coins`;
  }
  return `Charged card ending ${input.slice(-4)}`;
}

console.log(pay(50));
console.log(pay("4111111111111111"));

// Union of object shapes
type Id = number | string;
function findUser(id: Id): string {
  return typeof id === "number" ? `Looking up user #${id}` : `Looking up user "${id}"`;
}
console.log(findUser(42));
console.log(findUser("asha.k"));

// Arrays of union types
const mixedScores: (number | null)[] = [78, null, 91, 65, null];
const taken = mixedScores.filter((s): s is number => s !== null);
console.log("Exams taken:", taken.length, "| average:", taken.reduce((a, b) => a + b, 0) / taken.length);

// Only members shared by all types can be used without checking:
function lengthOf(value: string | string[]): number {
  return value.length; // OK: both strings and arrays have .length
}
console.log(lengthOf("hello"), lengthOf(["a", "b"]));
