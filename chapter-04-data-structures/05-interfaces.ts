// Chapter 4.5 - Interfaces
// Run: npx tsx chapter-04-data-structures/05-interfaces.ts
//
// Real-world picture: a power socket standard. Any plug that fits the standard
// works, whatever the brand. An interface is that standard for objects.

interface Product {
  sku: string;
  name: string;
  price: number;
}

// extends: a more specific standard built on top of another one
interface Laptop extends Product {
  ramGb: number;
  screenInches: number;
}

interface Shirt extends Product {
  size: "S" | "M" | "L" | "XL";
}

const laptop: Laptop = { sku: "LP-01", name: "AirBook", price: 89_990, ramGb: 16, screenInches: 14 };
const shirt: Shirt = { sku: "SH-22", name: "Linen Shirt", price: 1_499, size: "M" };

// A function that accepts any Product, including Laptops and Shirts
function priceTag(p: Product): string {
  return `${p.name} (${p.sku}) - Rs ${p.price.toLocaleString("en-IN")}`;
}
console.log(priceTag(laptop));
console.log(priceTag(shirt));

// Interfaces can describe methods too
interface Shape {
  name: string;
  area(): number;
}

const circle: Shape = { name: "circle", area: () => Math.PI * 2 ** 2 };
const square: Shape = { name: "square", area: () => 3 * 3 };

for (const s of [circle, square]) {
  console.log(`${s.name} area: ${s.area().toFixed(2)}`);
}
