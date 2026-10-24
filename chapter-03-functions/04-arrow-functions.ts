// Chapter 3.4 - Arrow functions
// Run: npx tsx chapter-03-functions/04-arrow-functions.ts
//
// Real-world picture: a sticky note versus a formal letter.
// A regular function is a letter; an arrow function is a quick sticky note
// for short jobs.

// Regular function
function addGstLetter(price: number): number {
  return price * 1.18;
}

// Arrow function with a body
const addGstNote = (price: number): number => {
  return price * 1.18;
};

// Arrow function with an implicit return (one expression, no braces)
const addGst = (price: number): number => price * 1.18;

console.log(addGstLetter(100).toFixed(2), addGstNote(100).toFixed(2), addGst(100).toFixed(2));

// Arrow functions shine when passed to other functions.
const prices = [100, 250, 999];
const withGst = prices.map((p) => Math.round(addGst(p)));
console.log("With GST:", withGst);

// Returning an object literal needs parentheses.
const makeTicket = (seat: string, movie: string) => ({ seat, movie, issuedAt: "18:30" });
console.log(makeTicket("F7", "Space Saga"));

// Zero parameters
const rollDice = (): number => Math.floor(Math.random() * 6) + 1;
const roll = rollDice();
console.log("Dice rolled a number from 1 to 6:", roll >= 1 && roll <= 6);
