// Chapter 8.4 - Discriminated unions
// Run: npx tsx chapter-08-typescript-strengths/04-discriminated-unions.ts
//
// Real-world picture: a delivery tracking page. The status label (ordered, shipped,
// delivered) decides which extra details you see: a tracking number, a delivery date...

type Delivery =
  | { status: "ordered"; orderedAt: string }
  | { status: "shipped"; trackingNo: string; courier: string }
  | { status: "delivered"; deliveredAt: string; signedBy: string }
  | { status: "cancelled"; reason: string };

function describe(d: Delivery): string {
  switch (d.status) {
    case "ordered":
      return `Ordered at ${d.orderedAt}`;
    case "shipped":
      return `On the way with ${d.courier}, tracking ${d.trackingNo}`;
    case "delivered":
      return `Delivered at ${d.deliveredAt}, signed by ${d.signedBy}`;
    case "cancelled":
      return `Cancelled: ${d.reason}`;
    default: {
      const missing: never = d; // compile error if a status is forgotten
      return missing;
    }
  }
}

const history: Delivery[] = [
  { status: "ordered", orderedAt: "09:10" },
  { status: "shipped", trackingNo: "BLR123456", courier: "SpeedPost" },
  { status: "delivered", deliveredAt: "17:42", signedBy: "Mrs. Rao" },
  { status: "cancelled", reason: "address not found" },
];
for (const step of history) console.log(describe(step));

// Accessing a field from the wrong state is impossible:
// const d: Delivery = history[0]; d.trackingNo;
// Error: Property 'trackingNo' does not exist on type '{ status: "ordered"; ... }'.

// Shapes example: the classic textbook case
type Shape = { kind: "circle"; r: number } | { kind: "rect"; w: number; h: number };
const area = (s: Shape) => (s.kind === "circle" ? Math.PI * s.r ** 2 : s.w * s.h);
console.log("Areas:", [area({ kind: "circle", r: 1 }).toFixed(2), area({ kind: "rect", w: 2, h: 5 })]);
