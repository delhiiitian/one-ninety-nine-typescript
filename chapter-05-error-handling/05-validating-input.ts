// Chapter 5.5 - Validating input with guard clauses
// Run: npx tsx chapter-05-error-handling/05-validating-input.ts
//
// Real-world picture: airport security. Your bag is checked at the entrance,
// before boarding, not in the middle of the flight.

interface SignUp {
  username: string;
  password: string;
  age: number;
}

function validate(form: SignUp): string[] {
  const problems: string[] = [];
  if (form.username.trim().length < 3) problems.push("Username needs 3+ characters");
  if (!/^[a-z0-9_]+$/i.test(form.username)) problems.push("Username: letters, digits, _ only");
  if (form.password.length < 8) problems.push("Password needs 8+ characters");
  if (!/[0-9]/.test(form.password)) problems.push("Password needs a digit");
  if (form.age < 13) problems.push("You must be 13 or older");
  return problems;
}

// Guard clauses: exit early when something is wrong, keep the happy path flat.
function createAccount(form: SignUp): string {
  const problems = validate(form);
  if (problems.length > 0) {
    return `Rejected:\n  - ${problems.join("\n  - ")}`;
  }
  return `Welcome, ${form.username}!`;
}

console.log(createAccount({ username: "dev_kumar", password: "s3cretpass", age: 22 }));
console.log(createAccount({ username: "x!", password: "short", age: 10 }));

// Guarding numbers from outside the program
function safeQuantity(input: string): number {
  const qty = Number(input);
  if (!Number.isInteger(qty)) throw new Error(`Quantity must be a whole number, got "${input}"`);
  if (qty < 1 || qty > 10) throw new Error("Quantity must be between 1 and 10");
  return qty;
}
for (const input of ["3", "2.5", "50"]) {
  try {
    console.log("Quantity OK:", safeQuantity(input));
  } catch (e) {
    console.log("Invalid:", (e as Error).message);
  }
}
