// Chapter 5.2 - try, catch and finally
// Run: npx tsx chapter-05-error-handling/02-try-catch-finally.ts
//
// Real-world picture: a trapeze artist. try = the jump, catch = the safety net,
// finally = the bow to the audience, which happens whether the jump worked or not.

function parseAge(text: string): number {
  const age = Number(text);
  if (!Number.isInteger(age) || age < 0 || age > 130) {
    throw new Error(`"${text}" is not a valid age`);
  }
  return age;
}

function register(input: string): void {
  console.log(`\nRegistering with age input "${input}"`);
  try {
    const age = parseAge(input);
    console.log(`  Success: age ${age} saved`);
  } catch (error) {
    console.log(`  Failed: ${(error as Error).message}`);
  } finally {
    console.log("  (form closed)");
  }
}

register("27");
register("abc");
register("-5");

// finally is perfect for clean-up, like releasing a lock or closing a file.
let printerBusy = false;
function printDocument(pages: number): void {
  printerBusy = true;
  try {
    if (pages > 100) throw new Error("Too many pages");
    console.log(`Printed ${pages} pages`);
  } catch (error) {
    console.log("Print error:", (error as Error).message);
  } finally {
    printerBusy = false; // always runs, so the printer is never stuck
  }
}
printDocument(5);
printDocument(500);
console.log("Printer busy?", printerBusy);
