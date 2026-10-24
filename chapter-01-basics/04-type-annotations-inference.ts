// Chapter 1.4 - Type annotations and type inference
// Run: npx tsx chapter-01-basics/04-type-annotations-inference.ts
//
// Real-world picture: a labelled jar ("SUGAR") versus a clear glass jar.
// You label a jar when it is empty; a clear jar already shows what is inside.

// Annotation: we write the type ourselves.
let temperature: number;
temperature = 31;

// Inference: TypeScript looks at the value and works the type out.
let city = "Chennai";       // inferred as string
let humidity = 78;          // inferred as number
let isRaining = false;      // inferred as boolean

console.log(`${city}: ${temperature}°C, humidity ${humidity}%, raining: ${isRaining}`);

// Inference keeps protecting you later.
// city = 42; // Error: Type 'number' is not assignable to type 'string'.

// const gives an even narrower, "literal" type.
const unit = "celsius";   // type is exactly "celsius", not just string
console.log("Unit:", unit);

// When to annotate: function inputs, empty variables, and public data shapes.
function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}
console.log(`${temperature}°C is ${toFahrenheit(temperature)}°F`);
