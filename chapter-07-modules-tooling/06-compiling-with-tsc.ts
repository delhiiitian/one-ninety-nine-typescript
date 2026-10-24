// Chapter 7.6 - Compiling TypeScript to JavaScript
// Run: npx tsx chapter-07-modules-tooling/06-compiling-with-tsc.ts
//
// Real-world picture: a film being dubbed. The story stays the same, only the
// language changes so the audience (Node or the browser) can understand it.
// Types are like director's notes: useful while making the film, cut from the final cut.

import ts from "typescript";

const source = `
interface User { name: string; age: number }
const greet = (user: User): string => \`Hi \${user.name}\`;
let count: number = 0;
enum Size { Small, Large }
`;

// The same job `npx tsc` does for whole projects, done here on one snippet.
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});

console.log("--- TypeScript in ---" + source);
console.log("--- JavaScript out ---\n" + output.outputText);

// Notice: the interface and the ': string' / ': number' annotations are gone.
// The enum stays, because enums create real objects at run time.
console.log("TypeScript version used:", ts.version);

// Three ways to run TypeScript:
//   npx tsx file.ts          -> run directly (what this book uses)
//   npx tsc && node dist/... -> compile first, then run plain JavaScript
//   node file.ts             -> Node 22.18+ can strip simple types by itself
