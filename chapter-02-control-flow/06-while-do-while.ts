// Chapter 2.6 - while and do...while loops
// Run: npx tsx chapter-02-control-flow/06-while-do-while.ts
//
// Real-world picture: filling a bucket. You keep pouring WHILE it is not full.
// You do not know in advance how many mugs it will take.

const bucketCapacity = 10; // litres
const mugSize = 1.5;
let water = 0;
let mugs = 0;

while (water + mugSize <= bucketCapacity) {
  water += mugSize;
  mugs++;
}
console.log(`Poured ${mugs} mugs, bucket holds ${water} litres.`);

// Doubling savings until a goal is reached.
let savings = 1000;
let years = 0;
while (savings < 8000) {
  savings *= 2;
  years++;
}
console.log(`Savings reach Rs ${savings} after ${years} doublings.`);

// do...while runs the body at least once, then checks.
// Like a vending machine that always shows the menu at least once.
let attempts = 0;
const pinsTried = ["1111", "0000", "4321"];
let entered: string;
do {
  entered = pinsTried[attempts];
  attempts++;
  console.log(`Attempt ${attempts}: entered ${entered}`);
} while (entered !== "4321" && attempts < pinsTried.length);
console.log(entered === "4321" ? "Unlocked" : "Locked out");
