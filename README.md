# The 199 Series: TypeScript (book code)

All runnable code for the beginner book *The 199 Series: TypeScript*: 9 chapters with 9 short examples each (81 in total), and 9 projects, one per chapter. Every file in the book links here.

## Get started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/delhiiitian/one-ninety-nine-typescript.git
cd one-ninety-nine-typescript
npm install

# run any example
npx tsx chapter-01-basics/01-hello-typescript.ts

# check every file for type errors
npm run typecheck

# run every example, project and test once
npm test
```

Each example starts with a comment that names its section in the book, the exact command to run it, and the everyday comparison used to explain it.

## Chapters

### 1. Basics

- [Hello, TypeScript](chapter-01-basics/01-hello-typescript.ts)
- [Variables with let and const](chapter-01-basics/02-variables-let-const.ts)
- [The basic types: string, number, boolean](chapter-01-basics/03-basic-types.ts)
- [Type annotations and type inference](chapter-01-basics/04-type-annotations-inference.ts)
- [Arithmetic and assignment operators](chapter-01-basics/05-operators.ts)
- [Strings and template literals](chapter-01-basics/06-strings-template-literals.ts)
- [null, undefined and strict mode](chapter-01-basics/07-null-undefined-strict.ts)
- [any versus unknown](chapter-01-basics/08-any-vs-unknown.ts)
- [Converting between types](chapter-01-basics/09-type-conversion.ts)
- Project: [Bill Splitter](projects/01-bill-splitter)

### 2. Control flow

- [Making decisions with if / else](chapter-02-control-flow/01-if-else.ts)
- [Comparison and logical operators](chapter-02-control-flow/02-comparison-logical.ts)
- [The switch statement](chapter-02-control-flow/03-switch.ts)
- [Ternary, ?? (nullish coalescing) and ?. (optional chaining)](chapter-02-control-flow/04-ternary-nullish.ts)
- [The classic for loop](chapter-02-control-flow/05-for-loop.ts)
- [while and do...while loops](chapter-02-control-flow/06-while-do-while.ts)
- [for...of and for...in](chapter-02-control-flow/07-for-of-for-in.ts)
- [break and continue](chapter-02-control-flow/08-break-continue.ts)
- [Truthy and falsy values](chapter-02-control-flow/09-truthy-falsy.ts)
- Project: [Number Guessing Game](projects/02-number-guessing-game)

### 3. Functions

- [Declaring functions with typed parameters and return types](chapter-03-functions/01-declaring-functions.ts)
- [Optional and default parameters](chapter-03-functions/02-optional-default-params.ts)
- [Rest parameters and the spread operator](chapter-03-functions/03-rest-spread.ts)
- [Arrow functions](chapter-03-functions/04-arrow-functions.ts)
- [Function types](chapter-03-functions/05-function-types.ts)
- [Callbacks and higher-order functions](chapter-03-functions/06-callbacks-higher-order.ts)
- [Scope and closures](chapter-03-functions/07-scope-closures.ts)
- [Recursion](chapter-03-functions/08-recursion.ts)
- [Special return types: void and never](chapter-03-functions/09-void-never.ts)
- Project: [Unit Converter](projects/03-unit-converter)

### 4. Data structures

- [Arrays](chapter-04-data-structures/01-arrays.ts)
- [Array methods: map, filter, reduce, find, some, every](chapter-04-data-structures/02-array-methods.ts)
- [Tuples](chapter-04-data-structures/03-tuples.ts)
- [Objects and type aliases](chapter-04-data-structures/04-objects-type-aliases.ts)
- [Interfaces](chapter-04-data-structures/05-interfaces.ts)
- [Optional and readonly properties](chapter-04-data-structures/06-optional-readonly.ts)
- [Map: key-value storage](chapter-04-data-structures/07-map.ts)
- [Set: a collection of unique values](chapter-04-data-structures/08-set.ts)
- [Destructuring and spreading objects](chapter-04-data-structures/09-destructuring-spread.ts)
- Project: [Shopping Cart](projects/04-shopping-cart)

### 5. Error handling

- [What an error is, and how to throw one](chapter-05-error-handling/01-throwing-errors.ts)
- [try, catch and finally](chapter-05-error-handling/02-try-catch-finally.ts)
- [The caught value is unknown: narrow it before use](chapter-05-error-handling/03-unknown-in-catch.ts)
- [Custom error classes](chapter-05-error-handling/04-custom-error-classes.ts)
- [Validating input with guard clauses](chapter-05-error-handling/05-validating-input.ts)
- [The Result pattern: returning errors instead of throwing](chapter-05-error-handling/06-result-pattern.ts)
- [Errors in asynchronous code](chapter-05-error-handling/07-async-errors.ts)
- [Assertion functions](chapter-05-error-handling/08-assertion-functions.ts)
- [Re-throwing errors and adding a cause](chapter-05-error-handling/09-rethrow-and-cause.ts)
- Project: [Bank Account Simulator](projects/05-bank-account-simulator)

### 6. Files and I/O

- [Reading command-line arguments](chapter-06-files-io/01-command-line-args.ts)
- [Reading user input from the keyboard](chapter-06-files-io/02-reading-user-input.ts)
- [Reading a text file](chapter-06-files-io/03-reading-files.ts)
- [Writing and appending files](chapter-06-files-io/04-writing-files.ts)
- [Working with file paths](chapter-06-files-io/05-paths.ts)
- [JSON: saving and loading structured data](chapter-06-files-io/06-json.ts)
- [Reading CSV files](chapter-06-files-io/07-csv.ts)
- [Working with folders](chapter-06-files-io/08-directories.ts)
- [Streams: handling big files a piece at a time](chapter-06-files-io/09-streams.ts)
- Project: [Todo Cli](projects/06-todo-cli)

### 7. Modules and tooling

- [Splitting code into modules: export and import](chapter-07-modules-tooling/01-export-import.ts)
- [Default exports versus named exports](chapter-07-modules-tooling/02-default-exports.ts)
- [Node's built-in modules](chapter-07-modules-tooling/03-built-in-modules.ts)
- [npm and package.json](chapter-07-modules-tooling/04-npm-package-json.ts)
- [tsconfig.json: the compiler's settings](chapter-07-modules-tooling/05-tsconfig.ts)
- [Compiling TypeScript to JavaScript](chapter-07-modules-tooling/06-compiling-with-tsc.ts)
- [Declaration files (.d.ts) for JavaScript code](chapter-07-modules-tooling/07-declaration-files.ts)
- [Writing automated tests with node:test](chapter-07-modules-tooling/08-testing.ts)
- [Configuration with environment variables](chapter-07-modules-tooling/09-env-config.ts)
- Project: [Password Toolkit](projects/07-password-toolkit)

### 8. TypeScript's strengths: the type system

- [Union types: "this OR that"](chapter-08-typescript-strengths/01-union-types.ts)
- [Literal types: exact allowed values](chapter-08-typescript-strengths/02-literal-types.ts)
- [Type narrowing: typeof, instanceof, in, and type guards](chapter-08-typescript-strengths/03-narrowing.ts)
- [Discriminated unions](chapter-08-typescript-strengths/04-discriminated-unions.ts)
- [Generic functions](chapter-08-typescript-strengths/05-generic-functions.ts)
- [Generic types and constraints](chapter-08-typescript-strengths/06-generic-types-constraints.ts)
- [Enums versus unions of literals](chapter-08-typescript-strengths/07-enums-vs-unions.ts)
- [Utility types: Partial, Required, Pick, Omit, Readonly, Record](chapter-08-typescript-strengths/08-utility-types.ts)
- [Classes, access modifiers and implements](chapter-08-typescript-strengths/09-classes.ts)
- Project: [Order Tracker](projects/08-order-tracker)

### 9. Real-world integration

- [Promises and async/await](chapter-09-real-world/01-promises-async-await.ts)
- [Running tasks in parallel, with timeouts](chapter-09-real-world/02-parallel-and-timeouts.ts)
- [Fetching data from a web API](chapter-09-real-world/03-fetch-api.ts)
- [Building a small web server](chapter-09-real-world/04-http-server.ts)
- [A JSON REST API with routes](chapter-09-real-world/05-json-rest-api.ts)
- [Validating data from the outside world](chapter-09-real-world/06-validating-external-data.ts)
- [Dates and times](chapter-09-real-world/07-dates-times.ts)
- [TypeScript in the browser: the DOM](chapter-09-real-world/08-browser-dom.ts)
- [Events with EventEmitter](chapter-09-real-world/09-events.ts)
- Project: [Bookmark Api](projects/09-bookmark-api)

## Projects

| # | Project | What it practises |
| --- | --- | --- |
| 1 | [Bill Splitter](projects/01-bill-splitter) | Variables, numbers, strings, input checks |
| 2 | [Number Guessing Game](projects/02-number-guessing-game) | Loops, conditions, switch, user input |
| 3 | [Unit Converter](projects/03-unit-converter) | Function types, higher-order functions, closures |
| 4 | [Shopping Cart](projects/04-shopping-cart) | Arrays, Maps, Sets, interfaces, classes |
| 5 | [Bank Account Simulator](projects/05-bank-account-simulator) | Custom errors, validation, Result pattern, roll-back |
| 6 | [Todo Cli](projects/06-todo-cli) | Command-line arguments, JSON files, safe saving |
| 7 | [Password Toolkit](projects/07-password-toolkit) | Modules, a public API, CLI, automated tests |
| 8 | [Order Tracker](projects/08-order-tracker) | Discriminated unions, generics, state machines |
| 9 | [Bookmark Api](projects/09-bookmark-api) | HTTP server, routing, validation, persistence |

## Repository layout

```text
chapter-01-basics/ ... chapter-09-real-world/   one file per subtopic
projects/01-bill-splitter/ ... 09-bookmark-api/ one folder per project, each with a README
scripts/run-all.ts                               runs everything (npm test)
```
