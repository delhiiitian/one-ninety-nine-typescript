// A module with one default export and one named export, used by 02-default-exports.ts

export type Level = "info" | "warn" | "error";

export default function log(level: Level, message: string): void {
  const icon = { info: "i", warn: "!", error: "x" }[level];
  console.log(`[${icon}] ${level.toUpperCase().padEnd(5)} ${message}`);
}
