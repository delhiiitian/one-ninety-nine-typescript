// Chapter 1.6 - Strings and template literals
// Run: npx tsx chapter-01-basics/06-strings-template-literals.ts
//
// Real-world picture: a wedding invitation template.
// The card is printed once, and only the guest name is filled in for each guest.

const guest = "Mr. Kapoor";
const event = "Priya & Arjun's wedding";
const date = "12 December";

// Template literal: backticks plus ${ } placeholders.
const invite = `Dear ${guest},
You are invited to ${event} on ${date}.
Seats left: ${120 - 87}`;
console.log(invite);

// Common string tools
const email = "  Priya.Sharma@Example.COM ";
const clean = email.trim().toLowerCase();
console.log("Cleaned email:", clean);
console.log("Length:", clean.length);
console.log("Has @?", clean.includes("@"));
console.log("Username:", clean.slice(0, clean.indexOf("@")));
console.log("Shout:", guest.toUpperCase());
console.log("Padded order no:", String(42).padStart(6, "0"));
console.log("Words:", "red,green,blue".split(","));
console.log("Replace:", "I like tea".replace("tea", "coffee"));
