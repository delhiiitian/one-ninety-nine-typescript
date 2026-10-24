// Chapter 5.4 - Custom error classes
// Run: npx tsx chapter-05-error-handling/04-custom-error-classes.ts
//
// Real-world picture: hospital triage tags. Red, yellow and green tags tell staff
// exactly what kind of problem a patient has, so the right team responds.

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class PaymentDeclinedError extends Error {
  constructor(public reason: string) {
    super(`Payment declined: ${reason}`);
    this.name = "PaymentDeclinedError";
  }
}

function placeOrder(email: string, cardBalance: number, total: number): string {
  if (!email.includes("@")) {
    throw new ValidationError("email", "Please enter a valid email");
  }
  if (cardBalance < total) {
    throw new PaymentDeclinedError("insufficient balance");
  }
  return "Order placed!";
}

const attempts: Array<[string, number, number]> = [
  ["sara@example.com", 5000, 1200],
  ["sara.example.com", 5000, 1200],
  ["sara@example.com", 500, 1200],
];

for (const [email, balance, total] of attempts) {
  try {
    console.log(placeOrder(email, balance, total));
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`Fix the "${error.field}" field: ${error.message}`);
    } else if (error instanceof PaymentDeclinedError) {
      console.log(`Try another card (${error.reason})`);
    } else {
      throw error; // not ours: let it go up
    }
  }
}
