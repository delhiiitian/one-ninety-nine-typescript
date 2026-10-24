// Chapter 2.8 - break and continue
// Run: npx tsx chapter-02-control-flow/08-break-continue.ts
//
// Real-world picture: checking parcels on a conveyor belt.
// continue = skip a damaged parcel and look at the next one.
// break    = a fire alarm rings, stop the belt completely.

const parcels = ["ok", "ok", "damaged", "ok", "fire-alarm", "ok"];
let shipped = 0;

for (const [i, status] of parcels.entries()) {
  if (status === "damaged") {
    console.log(`Parcel ${i + 1}: damaged, skipping`);
    continue;
  }
  if (status === "fire-alarm") {
    console.log(`Parcel ${i + 1}: ALARM! Stopping the belt.`);
    break;
  }
  shipped++;
  console.log(`Parcel ${i + 1}: shipped`);
}
console.log("Total shipped:", shipped);

// Searching: stop as soon as you find what you need.
const seats = ["taken", "taken", "free", "free"];
let firstFree = -1;
for (let i = 0; i < seats.length; i++) {
  if (seats[i] === "free") {
    firstFree = i;
    break;
  }
}
console.log("First free seat number:", firstFree + 1);
