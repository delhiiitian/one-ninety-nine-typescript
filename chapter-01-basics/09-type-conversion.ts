// Chapter 1.9 - Converting between types
// Run: npx tsx chapter-01-basics/09-type-conversion.ts
//
// Real-world picture: a currency exchange counter.
// You hand over one kind of money and get another, and the counter refuses fake notes.

// Text typed into a form always arrives as a string.
const ageInput = "29";
const priceInput = "199.50";
const junkInput = "twelve";

const age = Number(ageInput);            // 29
const price = parseFloat(priceInput);    // 199.5
const wholeRupees = parseInt(priceInput, 10); // 199
const junk = Number(junkInput);          // NaN

console.log(age + 1, price * 2, wholeRupees);
console.log("Is junk a valid number?", !Number.isNaN(junk));

// Number to string
const orderId = 7;
console.log("Order #" + String(orderId).padStart(4, "0"));
console.log("Price label:", price.toFixed(2));

// To boolean: empty or zero-like values become false.
console.log(Boolean(""), Boolean("yes"), Boolean(0), Boolean(5));

// Watch out: + joins strings instead of adding them.
console.log("Wrong:", ageInput + 1);          // "291"
console.log("Right:", Number(ageInput) + 1);  // 30
