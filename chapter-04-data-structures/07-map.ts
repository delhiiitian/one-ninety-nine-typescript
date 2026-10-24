// Chapter 4.7 - Map: key-value storage
// Run: npx tsx chapter-04-data-structures/07-map.ts
//
// Real-world picture: a coat-check counter. You hand in your coat and get token 42.
// Later, token 42 gets you exactly your coat back, fast.

const stock = new Map<string, number>();

stock.set("apples", 40);
stock.set("bananas", 120);
stock.set("mangoes", 15);

console.log("Mangoes in stock:", stock.get("mangoes"));
console.log("Do we sell kiwis?", stock.has("kiwis"));
console.log("Kinds of fruit:", stock.size);

// Update a value
stock.set("mangoes", (stock.get("mangoes") ?? 0) - 5);
console.log("Mangoes after sale:", stock.get("mangoes"));

// Remove a key
stock.delete("bananas");

// Loop over a Map
for (const [fruit, qty] of stock) {
  console.log(`${fruit}: ${qty}`);
}

// Real use: counting how many times each word appears.
const review = "good food good service bad parking good price";
const wordCount = new Map<string, number>();
for (const word of review.split(" ")) {
  wordCount.set(word, (wordCount.get(word) ?? 0) + 1);
}
console.log("Word counts:", Object.fromEntries(wordCount));

// Keys can be any type, not only strings.
const seatOwner = new Map<number, string>([[1, "Ira"], [2, "Om"]]);
console.log("Seat 2 belongs to", seatOwner.get(2));
