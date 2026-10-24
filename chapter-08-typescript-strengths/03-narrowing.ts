// Chapter 8.3 - Type narrowing: typeof, instanceof, in, and type guards
// Run: npx tsx chapter-08-typescript-strengths/03-narrowing.ts
//
// Real-world picture: a sorting office. A parcel arrives; staff check its label
// (size, country, "fragile") and send it down the right chute.

class Letter {
  constructor(public to: string) {}
}
class Parcel {
  constructor(public to: string, public weightKg: number) {}
}

type Mail = Letter | Parcel;

function postage(item: Mail): number {
  if (item instanceof Parcel) {
    return 40 + item.weightKg * 25; // TypeScript knows it is a Parcel here
  }
  return 5; // and a Letter here
}
console.log("Letter:", postage(new Letter("Pune")), "| 3kg parcel:", postage(new Parcel("Goa", 3)));

// typeof for primitive types
function formatValue(v: string | number | boolean): string {
  if (typeof v === "string") return `"${v}"`;
  if (typeof v === "number") return v.toFixed(2);
  return v ? "yes" : "no";
}
console.log(formatValue("hi"), formatValue(3.14159), formatValue(false));

// "in" checks whether a property exists
interface Car { drive(): string }
interface Boat { sail(): string }
function travel(v: Car | Boat): string {
  return "drive" in v ? v.drive() : v.sail();
}
console.log(travel({ drive: () => "Driving on the highway" }));
console.log(travel({ sail: () => "Sailing across the lake" }));

// A custom type guard: a function returning `value is Type`
interface Cat { meow(): string }
function isCat(pet: unknown): pet is Cat {
  return typeof pet === "object" && pet !== null && "meow" in pet;
}
const pets: unknown[] = [{ meow: () => "Meow!" }, { bark: () => "Woof!" }];
for (const pet of pets) console.log(isCat(pet) ? pet.meow() : "Not a cat");
