// Chapter 4.3 - Tuples
// Run: npx tsx chapter-04-data-structures/03-tuples.ts
//
// Real-world picture: a map pin. It always has exactly two numbers in a fixed order:
// latitude first, longitude second. Swap them and you land in the ocean.

type Coordinates = [latitude: number, longitude: number];

const indiaGate: Coordinates = [28.6129, 77.2295];
const gatewayOfIndia: Coordinates = [18.922, 72.8347];

console.log("India Gate is at", indiaGate);

// Destructuring a tuple
const [lat, lng] = gatewayOfIndia;
console.log(`Gateway of India: lat ${lat}, lng ${lng}`);

// A function returning several values as a tuple
function minMax(values: number[]): [min: number, max: number] {
  return [Math.min(...values), Math.max(...values)];
}
const [coldest, hottest] = minMax([18, 31, 24, 35, 22]);
console.log(`This week: low ${coldest}°C, high ${hottest}°C`);

// Mixed types in a fixed order: [name, age, isMember]
const member: [string, number, boolean] = ["Lakshmi", 34, true];
console.log(`${member[0]} (${member[1]}) member: ${member[2]}`);

// Wrong order is caught:
// const wrong: Coordinates = ["28.6", 77.2]; // Error: Type 'string' is not assignable to 'number'.

// readonly tuples cannot be changed after creation
const rgbRed: readonly [number, number, number] = [255, 0, 0];
// rgbRed[0] = 10; // Error: Cannot assign to '0' because it is a read-only property.
console.log("Red as RGB:", rgbRed.join(", "));
