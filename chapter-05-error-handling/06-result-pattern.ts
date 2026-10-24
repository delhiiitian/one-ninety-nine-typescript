// Chapter 5.6 - The Result pattern: returning errors instead of throwing
// Run: npx tsx chapter-05-error-handling/06-result-pattern.ts
//
// Real-world picture: an exam result slip. It always comes back, and it clearly says
// either PASS (with marks) or FAIL (with the reason). Nobody has to "catch" anything.

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function parsePrice(text: string): Result<number> {
  const value = Number(text);
  if (text.trim() === "" || Number.isNaN(value)) {
    return { ok: false, error: `"${text}" is not a number` };
  }
  if (value < 0) {
    return { ok: false, error: "Price cannot be negative" };
  }
  return { ok: true, value };
}

for (const input of ["499", "abc", "-20", ""]) {
  const result = parsePrice(input);
  if (result.ok) {
    console.log(`"${input}" -> price ${result.value}`);   // TypeScript knows value exists
  } else {
    console.log(`"${input}" -> error: ${result.error}`);  // and here, error exists
  }
}

// Combining results: total a list, stop at the first bad entry.
function totalPrices(inputs: string[]): Result<number> {
  let sum = 0;
  for (const input of inputs) {
    const r = parsePrice(input);
    if (!r.ok) return r;
    sum += r.value;
  }
  return { ok: true, value: sum };
}

console.log(totalPrices(["100", "250", "50"]));
console.log(totalPrices(["100", "oops", "50"]));
