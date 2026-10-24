// Chapter 7.3 - Node's built-in modules
// Run: npx tsx chapter-07-modules-tooling/03-built-in-modules.ts
//
// Real-world picture: a new flat that comes with a fridge and a stove already fitted.
// You can start cooking without buying anything. Node ships with modules ready to use.

import os from "node:os";
import { randomUUID, createHash, randomInt } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";
import { inspect } from "node:util";

// os: facts about the computer
console.log("Platform:", os.platform());
console.log("CPU cores:", os.cpus().length > 0 ? "detected" : "unknown");
console.log("Free memory > 0:", os.freemem() > 0);

// crypto: ids, hashes and secure random numbers
console.log("New order id looks like a UUID:", /^[0-9a-f-]{36}$/.test(randomUUID()));
const fingerprint = createHash("sha256").update("my-file-contents").digest("hex");
console.log("SHA-256 fingerprint:", fingerprint.slice(0, 16) + "...");
const otp = randomInt(100000, 1000000);
console.log("6-digit one-time password generated:", String(otp).length === 6);

// timers/promises: wait without blocking the program
const start = Date.now();
await sleep(100);
console.log("Waited at least 100 ms:", Date.now() - start >= 95);

// util.inspect: print nested objects fully
const nested = { a: { b: { c: { d: "deep" } } } };
console.log(inspect(nested, { depth: null }));
