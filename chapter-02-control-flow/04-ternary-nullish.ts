// Chapter 2.4 - Ternary, ?? (nullish coalescing) and ?. (optional chaining)
// Run: npx tsx chapter-02-control-flow/04-ternary-nullish.ts
//
// Real-world picture: a hotel receptionist.
// "Do you have a booking? Then your room, otherwise the waiting list." (ternary)
// "No preferred pillow? Then the standard one." (??)
// "If you have a car, where is it parked?" (?.)

interface Guest {
  name: string;
  hasBooking: boolean;
  pillow?: string;
  car?: { plate: string; parkingSpot?: string };
}

const guests: Guest[] = [
  { name: "Anil", hasBooking: true, pillow: "memory foam", car: { plate: "DL 3C 1234", parkingSpot: "B2" } },
  { name: "Zoya", hasBooking: false },
  { name: "Ravi", hasBooking: true, car: { plate: "MH 01 9999" } },
];

for (const g of guests) {
  const status = g.hasBooking ? "Room ready" : "Waiting list";
  const pillow = g.pillow ?? "standard";
  const spot = g.car?.parkingSpot ?? "no parking needed";
  console.log(`${g.name}: ${status}, pillow: ${pillow}, parking: ${spot}`);
}

// ?? only replaces null/undefined. || also replaces 0 and "".
const savedVolume = 0;
console.log("With ||:", savedVolume || 50); // 50 (wrong: user chose 0)
console.log("With ??:", savedVolume ?? 50); // 0  (right)
