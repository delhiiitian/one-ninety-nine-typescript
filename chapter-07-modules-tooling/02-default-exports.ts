// Chapter 7.2 - Default exports versus named exports
// Run: npx tsx chapter-07-modules-tooling/02-default-exports.ts
//
// Real-world picture: a restaurant's signature dish versus the full menu.
// The default export is the one thing a module is "famous for"; named exports are the menu.

// The default import can be given any name you like (here: log).
import log, { type Level } from "./lib/logger.ts";
// The same default, under a different name, still works:
import writeLog from "./lib/logger.ts";

log("info", "Server starting");
log("warn", "Disk 85% full");
writeLog("error", "Payment service not responding");

const levels: Level[] = ["info", "warn", "error"];
console.log("Known levels:", levels.join(", "));

// Guideline used by many teams: prefer named exports.
// Names stay the same everywhere, so search and auto-import work better.
