// Chapter 2.2 - Comparison and logical operators
// Run: npx tsx chapter-02-control-flow/02-comparison-logical.ts
//
// Real-world picture: a nightclub bouncer.
// You get in if you are 21 or older AND on the guest list, OR you are the owner.

interface Visitor {
  name: string;
  age: number;
  onGuestList: boolean;
  isOwner: boolean;
}

function canEnter(v: Visitor): boolean {
  return (v.age >= 21 && v.onGuestList) || v.isOwner;
}

const visitors: Visitor[] = [
  { name: "Kabir", age: 25, onGuestList: true, isOwner: false },
  { name: "Tara", age: 19, onGuestList: true, isOwner: false },
  { name: "Dev", age: 40, onGuestList: false, isOwner: true },
  { name: "Sam", age: 30, onGuestList: false, isOwner: false },
];

for (const v of visitors) {
  console.log(`${v.name}: ${canEnter(v) ? "welcome" : "sorry"}`);
}

// Always use === (strict equality). It checks value AND type.
const typedCode: string = "5";
const realCode: number = 5;
console.log('"5" === 5 ->', (typedCode as unknown) === realCode); // false
console.log('Number("5") === 5 ->', Number(typedCode) === realCode); // true

// ! flips a boolean.
const isClosed = false;
console.log("Open now?", !isClosed);
