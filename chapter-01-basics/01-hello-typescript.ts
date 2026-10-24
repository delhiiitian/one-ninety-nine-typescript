// Chapter 1.1 - Hello, TypeScript
// Run: npx tsx chapter-01-basics/01-hello-typescript.ts
//
// Real-world picture: TypeScript is JavaScript with a spell-checker.
// You write the same sentences, but mistakes get underlined before anyone reads them.

const appName: string = "Corner Coffee";
const openingYear: number = 2024;

console.log("Hello, TypeScript!");
console.log("Welcome to " + appName + ", open since " + openingYear + ".");

// console.log can print several values at once, separated by spaces.
console.log("Menu items today:", 12, "Open:", true);

// Try it: remove the comment marker below and run `npm run typecheck`.
// TypeScript will refuse, because a year must be a number, not text.
// const brokenYear: number = "twenty twenty four";
