// Chapter 8.7 - Enums versus unions of literals
// Run: npx tsx chapter-08-typescript-strengths/07-enums-vs-unions.ts
//
// Real-world picture: the gears on a bicycle. There is a fixed, named set
// (1st, 2nd, 3rd...) and you can only be in one of them at a time.

// A numeric enum: names mapped to numbers (0, 1, 2, ...)
enum Gear {
  Low = 1,
  Medium,
  High,
}
console.log("Medium gear number:", Gear.Medium);   // 2
console.log("Name of gear 3:", Gear[3]);           // "High" (reverse lookup)

// A string enum: readable values, great in logs and databases
enum OrderStatus {
  Pending = "PENDING",
  Paid = "PAID",
  Shipped = "SHIPPED",
}
function canCancel(status: OrderStatus): boolean {
  return status === OrderStatus.Pending || status === OrderStatus.Paid;
}
console.log("Can cancel shipped order?", canCancel(OrderStatus.Shipped));

// The modern alternative: a union of string literals (no extra JavaScript code)
type TrafficLight = "red" | "amber" | "green";
const next: Record<TrafficLight, TrafficLight> = { red: "green", green: "amber", amber: "red" };
let light: TrafficLight = "red";
for (let i = 0; i < 4; i++) {
  process.stdout.write(light + " -> ");
  light = next[light];
}
console.log(light);

// An `as const` object gives enum-like names AND a union type:
const Role = { Admin: "admin", Editor: "editor", Viewer: "viewer" } as const;
type Role = (typeof Role)[keyof typeof Role];
const me: Role = Role.Editor;
console.log("My role:", me, "| all roles:", Object.values(Role));
