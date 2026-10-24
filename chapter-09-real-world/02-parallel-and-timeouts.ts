// Chapter 9.2 - Running tasks in parallel, with timeouts
// Run: npx tsx chapter-09-real-world/02-parallel-and-timeouts.ts
//
// Real-world picture: making breakfast. You do not wait for the kettle before
// starting the toast. Start everything, then wait for all of it.

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function task(name: string, ms: number): Promise<string> {
  await wait(ms);
  return name;
}

// Sequential: one after another (slow)
let start = Date.now();
await task("boil water", 150);
await task("toast bread", 100);
await task("fry egg", 120);
console.log(`Sequential took ~${Math.round((Date.now() - start) / 10) * 10} ms`);

// Parallel: start together, wait for all (fast)
start = Date.now();
const done = await Promise.all([task("boil water", 150), task("toast bread", 100), task("fry egg", 120)]);
console.log(`Parallel took ~${Math.round((Date.now() - start) / 10) * 10} ms:`, done);

// Promise.race: first one to finish wins. Great for timeouts.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms} ms`)), ms),
  );
  return Promise.race([promise, timeout]);
}

try {
  console.log("Fast:", await withTimeout(task("quick API", 50), 200));
  console.log("Slow:", await withTimeout(task("slow API", 500), 200));
} catch (e) {
  console.log("Slow:", (e as Error).message);
}

// Built-in alternative for fetch: AbortSignal.timeout(ms)
console.log("AbortSignal.timeout exists:", typeof AbortSignal.timeout === "function");
