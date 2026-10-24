// Chapter 1.7 - null, undefined and strict mode
// Run: npx tsx chapter-01-basics/07-null-undefined-strict.ts
//
// Real-world picture: a parking spot.
// undefined = the spot was never assigned. null = it was assigned, and is now empty on purpose.

let middleName: string | undefined;          // not filled in yet
let assignedLocker: number | null = null;    // deliberately empty

console.log("Middle name:", middleName);       // undefined
console.log("Locker:", assignedLocker);        // null

assignedLocker = 17;
console.log("Locker now:", assignedLocker);

// With "strict": true in tsconfig.json, TypeScript makes you handle the empty case.
function greet(name: string | null): string {
  if (name === null) {
    return "Hello, guest!";
  }
  return `Hello, ${name.toUpperCase()}!`; // safe: name is a string here
}

console.log(greet("neha"));
console.log(greet(null));

// Without the check, TypeScript would stop you:
// function unsafe(name: string | null) { return name.toUpperCase(); }
// Error: 'name' is possibly 'null'.
