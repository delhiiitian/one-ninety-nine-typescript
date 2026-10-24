// Chapter 1.8 - any versus unknown
// Run: npx tsx chapter-01-basics/08-any-vs-unknown.ts
//
// Real-world picture: a parcel from an unknown sender.
// `any` = open it and use it straight away (risky).
// `unknown` = scan it first, then use it (safe).

const parcelAny: any = "a book";
// TypeScript lets this compile, but it crashes at run time:
try {
  parcelAny.read();
} catch (error) {
  console.log("any let a bug through:", (error as Error).message);
}

const parcelUnknown: unknown = JSON.parse('{"title": "TypeScript 199"}');
// parcelUnknown.title; // Error: 'parcelUnknown' is of type 'unknown'.

// Check before use: this is called "narrowing".
if (
  typeof parcelUnknown === "object" &&
  parcelUnknown !== null &&
  "title" in parcelUnknown
) {
  console.log("Safe title:", parcelUnknown.title);
}

function describe(value: unknown): string {
  if (typeof value === "string") return `text of length ${value.length}`;
  if (typeof value === "number") return `number ${value.toFixed(1)}`;
  return "something else";
}
console.log(describe("hello"));
console.log(describe(3.14159));
console.log(describe(true));
