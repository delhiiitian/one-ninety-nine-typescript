// Chapter 2.5 - The classic for loop
// Run: npx tsx chapter-02-control-flow/05-for-loop.ts
//
// Real-world picture: doing 10 push-ups. Start at 1, count each one, stop after 10.

for (let rep = 1; rep <= 10; rep++) {
  if (rep % 5 === 0) {
    console.log(`Push-up ${rep} - halfway checkpoint!`);
  } else {
    console.log(`Push-up ${rep}`);
  }
}

// A multiplication table: loops can count by any step.
const n = 7;
for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${String(i).padStart(2)} = ${n * i}`);
}

// Counting down
for (let seconds = 3; seconds > 0; seconds--) {
  console.log(`Launch in ${seconds}...`);
}
console.log("Lift off!");

// Nested loops: rows and seats in a cinema
for (let row = 1; row <= 3; row++) {
  let line = `Row ${row}: `;
  for (let seat = 1; seat <= 5; seat++) {
    line += `[${String.fromCharCode(64 + row)}${seat}] `;
  }
  console.log(line);
}
