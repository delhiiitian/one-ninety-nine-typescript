// Chapter 9.7 - Dates and times
// Run: npx tsx chapter-09-real-world/07-dates-times.ts
//
// Real-world picture: a world clock wall at an airport. One moment in time,
// shown differently in Delhi, London and New York.

const launch = new Date("2026-10-24T09:30:00Z"); // Z = UTC

console.log("ISO (for storing and APIs):", launch.toISOString());
console.log("Milliseconds since 1970:", launch.getTime());

// Show the same moment in different places and formats
const zones = ["Asia/Kolkata", "Europe/London", "America/New_York"];
for (const timeZone of zones) {
  const text = new Intl.DateTimeFormat("en-GB", {
    timeZone, dateStyle: "medium", timeStyle: "short",
  }).format(launch);
  console.log(`${timeZone.padEnd(18)} ${text}`);
}

// Date arithmetic: add days by working in milliseconds
const DAY = 24 * 60 * 60 * 1000;
const dueDate = new Date(launch.getTime() + 14 * DAY);
console.log("Library book due:", dueDate.toISOString().slice(0, 10));

// Difference between two dates
const exam = new Date("2026-12-15T00:00:00Z");
const daysLeft = Math.ceil((exam.getTime() - launch.getTime()) / DAY);
console.log("Days until exam:", daysLeft);

// Parts of a date (in UTC, so the result is the same on every computer)
const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(launch);
console.log(`Year ${launch.getUTCFullYear()}, month ${launch.getUTCMonth() + 1} (months start at 0!), ${weekday}`);

// "3 days ago" style text
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log(rtf.format(-3, "day"), "|", rtf.format(1, "day"), "|", rtf.format(2, "week"));

// Invalid dates do not throw; check them.
const bad = new Date("31/31/2026");
console.log("Valid date?", !Number.isNaN(bad.getTime()));
