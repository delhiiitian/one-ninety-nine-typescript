// Chapter 4.9 - Destructuring and spreading objects
// Run: npx tsx chapter-04-data-structures/09-destructuring-spread.ts
//
// Real-world picture: unpacking a grocery bag. You take out just the items you need
// and put them straight on the right shelf, instead of carrying the whole bag around.

interface Movie {
  title: string;
  year: number;
  rating: number;
  director: string;
  language?: string;
}

const movie: Movie = { title: "Lagaan", year: 2001, rating: 8.1, director: "Ashutosh Gowariker" };

// Object destructuring, with rename and default
const { title, year, director: madeBy, language = "Hindi" } = movie;
console.log(`${title} (${year}) by ${madeBy}, language: ${language}`);

// Destructuring right in the parameter list
function shortInfo({ title, rating }: Movie): string {
  return `${title}: ${rating}/10`;
}
console.log(shortInfo(movie));

// Array destructuring, skipping and collecting the rest
const podium = ["Gold: Neeraj", "Silver: Arshad", "Bronze: Jakub", "4th: Julian"];
const [winner, , third, ...others] = podium;
console.log(winner, "|", third, "| others:", others);

// Swapping two variables
let left = "tea";
let right = "coffee";
[left, right] = [right, left];
console.log("Swapped:", left, right);

// Object spread: copy and update without changing the original
const updated = { ...movie, rating: 8.2 };
console.log("Original rating:", movie.rating, "| updated:", updated.rating);

// Merging settings: later values win
const defaults = { theme: "light", fontSize: 14, notifications: true };
const userChoice = { theme: "dark" };
console.log("Settings:", { ...defaults, ...userChoice });

// Rest in objects: pull one field out, keep the rest
const { director, ...publicInfo } = movie;
console.log("Without director:", publicInfo, "| removed:", director);
