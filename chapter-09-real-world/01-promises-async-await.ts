// Chapter 9.1 - Promises and async/await
// Run: npx tsx chapter-09-real-world/01-promises-async-await.ts
//
// Real-world picture: the buzzer a food court gives you. You order, get a buzzer
// (the promise), and go find a table. When the food is ready, it buzzes.

function cook(dish: string, minutes: number): Promise<string> {
  return new Promise((resolve) => {
    // 1 "minute" = 20 ms here, so the demo is fast
    setTimeout(() => resolve(`${dish} is ready`), minutes * 20);
  });
}

// Promise style: .then runs when the value arrives
cook("Masala dosa", 3).then((msg) => console.log("then():", msg));

// async/await style: reads like normal, top-to-bottom code
async function lunch(): Promise<void> {
  console.log("Ordering...");
  const main = await cook("Paneer tikka", 5);
  console.log(main);
  const dessert = await cook("Gulab jamun", 2);
  console.log(dessert);
  console.log("Lunch finished");
}

console.log("Before lunch() is called");
await lunch();
console.log("After lunch() completes");

// An async function always returns a Promise
async function getTableNumber(): Promise<number> {
  return 12;
}
const table = await getTableNumber();
console.log("Your table:", table);
