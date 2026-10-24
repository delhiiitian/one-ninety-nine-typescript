// Chapter 5.1 - What an error is, and how to throw one
// Run: npx tsx chapter-05-error-handling/01-throwing-errors.ts
//
// Real-world picture: a fire alarm. When something is badly wrong, you do not
// quietly carry on; you pull the alarm so someone who can handle it reacts.

function withdraw(balance: number, amount: number): number {
  if (amount <= 0) {
    throw new Error("Withdrawal amount must be positive");
  }
  if (amount > balance) {
    throw new Error(`Insufficient funds: balance ${balance}, requested ${amount}`);
  }
  return balance - amount;
}

console.log("New balance:", withdraw(1000, 300));

// An uncaught error stops the program. Here we catch it so the demo continues.
try {
  withdraw(1000, 5000);
} catch (error) {
  const e = error as Error;
  console.log("Error name:   ", e.name);
  console.log("Error message:", e.message);
  console.log("Stack trace starts with:", e.stack?.split("\n")[0]);
}

// Built-in errors are thrown by JavaScript itself, too.
try {
  const settings = JSON.parse("{ broken json ");
  console.log(settings);
} catch (error) {
  console.log("JSON.parse threw a", (error as Error).name);
}
