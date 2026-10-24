// Chapter 4.8 - Set: a collection of unique values
// Run: npx tsx chapter-04-data-structures/08-set.ts
//
// Real-world picture: a guest list at the door. Writing the same name twice
// does not let that person in twice; each name appears only once.

const guestList = new Set<string>();
guestList.add("Arjun");
guestList.add("Meena");
guestList.add("Arjun"); // ignored: already there

console.log("Guests:", [...guestList]);
console.log("Count:", guestList.size);
console.log("Is Meena invited?", guestList.has("Meena"));

guestList.delete("Meena");
console.log("After removing Meena:", [...guestList]);

// Removing duplicates from an array: a very common trick.
const visitedCities = ["Delhi", "Agra", "Delhi", "Jaipur", "Agra"];
const uniqueCities = [...new Set(visitedCities)];
console.log("Unique cities:", uniqueCities);

// Comparing two groups
const likesTea = new Set(["Asha", "Ben", "Chen", "Dia"]);
const likesCoffee = new Set(["Ben", "Dia", "Eli"]);

const both = [...likesTea].filter((name) => likesCoffee.has(name));
const teaOnly = [...likesTea].filter((name) => !likesCoffee.has(name));
const anyDrink = new Set([...likesTea, ...likesCoffee]);

console.log("Likes both:", both);
console.log("Tea only:", teaOnly);
console.log("Everyone:", [...anyDrink]);
