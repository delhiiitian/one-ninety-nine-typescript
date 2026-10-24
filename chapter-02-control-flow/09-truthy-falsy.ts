// Chapter 2.9 - Truthy and falsy values
// Run: npx tsx chapter-02-control-flow/09-truthy-falsy.ts
//
// Real-world picture: a "Do Not Disturb" door sign.
// An empty hook (no sign) means you may knock. Anything hanging there means stop.
// In JavaScript, a few "empty" values count as false; everything else counts as true.

const values: unknown[] = [false, 0, "", null, undefined, NaN, "0", "false", [], {}, 42, "hi"];

for (const v of values) {
  const label = JSON.stringify(v) ?? String(v);
  console.log(`${label.padEnd(10)} is ${v ? "truthy" : "falsy"}`);
}

// Practical use: show a message only if the user typed something.
function welcome(nickname: string): string {
  if (nickname) {
    return `Welcome back, ${nickname}!`;
  }
  return "Welcome! Please choose a nickname.";
}
console.log(welcome("coder_99"));
console.log(welcome(""));

// Careful with numbers: 0 is falsy, even if 0 is a real answer.
const itemsInStock = 0;
console.log(itemsInStock ? "In stock" : "Out of stock");
console.log(itemsInStock !== undefined ? `Stock count: ${itemsInStock}` : "Unknown stock");
