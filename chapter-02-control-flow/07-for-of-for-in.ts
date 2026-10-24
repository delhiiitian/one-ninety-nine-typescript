// Chapter 2.7 - for...of and for...in
// Run: npx tsx chapter-02-control-flow/07-for-of-for-in.ts
//
// Real-world picture: a shopping list versus a filled form.
// for...of walks through the ITEMS on the list.
// for...in walks through the FIELD NAMES of the form.

const groceries = ["milk", "bread", "eggs", "rice"];

for (const item of groceries) {
  console.log("Buy:", item);
}

// Need the position too? Use entries().
for (const [index, item] of groceries.entries()) {
  console.log(`${index + 1}. ${item}`);
}

// for...of also works on strings: one character at a time.
let vowels = 0;
for (const ch of "typescript") {
  if ("aeiou".includes(ch)) vowels++;
}
console.log("Vowels in 'typescript':", vowels);

// for...in loops over the keys of an object.
const profile = { name: "Isha", city: "Pune", plan: "premium" };
for (const key in profile) {
  console.log(`${key}: ${profile[key as keyof typeof profile]}`);
}

// Modern alternative for objects: Object.entries with for...of.
for (const [key, value] of Object.entries(profile)) {
  console.log(`${key} = ${value}`);
}
