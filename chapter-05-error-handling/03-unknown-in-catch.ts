// Chapter 5.3 - The caught value is unknown: narrow it before use
// Run: npx tsx chapter-05-error-handling/03-unknown-in-catch.ts
//
// Real-world picture: the lost-and-found box. Anything can end up there
// (a phone, an umbrella, a sock), so you check what it is before you use it.

function risky(kind: number): void {
  if (kind === 1) throw new Error("A proper Error object");
  if (kind === 2) throw "just a string"; // legal in JavaScript, but bad practice
  if (kind === 3) throw { code: 404 };   // also legal
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }
  if (typeof error === "string") {
    return `String thrown: ${error}`;
  }
  if (typeof error === "object" && error !== null && "code" in error) {
    return `Object with code ${String(error.code)}`;
  }
  return "Unknown problem";
}

for (const kind of [1, 2, 3]) {
  try {
    risky(kind);
  } catch (error) {
    // In strict mode, `error` has type unknown.
    // error.message; // Error: 'error' is of type 'unknown'.
    console.log(describeError(error));
  }
}

// A small helper many real projects keep around
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
try {
  risky(2);
} catch (e) {
  console.log("Helper says:", errorMessage(e));
}
