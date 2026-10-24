// Chapter 6.9 - Streams: handling big files a piece at a time
// Run: npx tsx chapter-06-files-io/09-streams.ts
//
// Real-world picture: drinking through a straw instead of tipping the whole bucket
// into your mouth. A stream delivers a file in small sips.

import { createReadStream, createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { createInterface } from "node:readline";
import { join } from "node:path";
import { once } from "node:events";

const logPath = join(import.meta.dirname, "data", "server.log");
const outDir = join(import.meta.dirname, "output");
await mkdir(outDir, { recursive: true });

const counts: Record<string, number> = { INFO: 0, WARN: 0, ERROR: 0 };
const errorsOut = createWriteStream(join(outDir, "errors-only.log"));

// Read the log one line at a time. Memory use stays small even for a 10 GB file.
const lines = createInterface({ input: createReadStream(logPath), crlfDelay: Infinity });

let slowest = { ms: 0, line: "" };
for await (const line of lines) {
  const level = line.split(" ")[1];
  counts[level] = (counts[level] ?? 0) + 1;

  if (level === "ERROR") errorsOut.write(line + "\n");

  const ms = Number(line.match(/(\d+)ms$/)?.[1] ?? 0);
  if (ms > slowest.ms) slowest = { ms, line };
}

errorsOut.end();
await once(errorsOut, "finish");

console.log("Log levels:", counts);
console.log("Slowest request:", slowest.line);
console.log("Errors copied to output/errors-only.log");
