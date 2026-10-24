// Chapter 4.6 - Optional and readonly properties
// Run: npx tsx chapter-04-data-structures/06-optional-readonly.ts
//
// Real-world picture: a passport. The passport number is printed and can never be
// changed (readonly). The "spouse name" field can be left blank (optional).

interface Passport {
  readonly number: string;
  readonly issuedOn: string;
  fullName: string;
  spouseName?: string;
}

const passport: Passport = {
  number: "K1234567",
  issuedOn: "2022-03-14",
  fullName: "Vikram Rao",
};

console.log(`${passport.fullName}, passport ${passport.number}`);
console.log("Spouse:", passport.spouseName ?? "(not given)");

passport.spouseName = "Anjali Rao"; // optional fields can be filled in later
console.log("Spouse now:", passport.spouseName);

// passport.number = "Z9999999";
// Error: Cannot assign to 'number' because it is a read-only property.

// Optional fields must be checked before use.
function initials(p: Passport): string {
  const spouseInitial = p.spouseName ? p.spouseName[0] : "-";
  return `${p.fullName[0]} / ${spouseInitial}`;
}
console.log("Initials:", initials(passport));

// Readonly arrays: a published menu that nobody should edit by accident
const menu: readonly string[] = ["Idli", "Dosa", "Vada"];
// menu.push("Pizza"); // Error: Property 'push' does not exist on type 'readonly string[]'.
console.log("Menu:", menu.join(", "));
