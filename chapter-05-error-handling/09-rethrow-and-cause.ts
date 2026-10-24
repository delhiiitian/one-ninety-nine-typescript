// Chapter 5.9 - Re-throwing errors and adding a cause
// Run: npx tsx chapter-05-error-handling/09-rethrow-and-cause.ts
//
// Real-world picture: a customer complaint passed up the chain. The support agent
// writes "Refund failed" and staples the bank's original note to it, so the
// manager sees both the summary and the root cause.

function chargeBank(amount: number): void {
  throw new Error(`Bank timeout while charging ${amount}`);
}

function refundCustomer(orderId: string, amount: number): void {
  try {
    chargeBank(-amount);
  } catch (error) {
    // Wrap the low-level error with a clearer message, and keep the original as `cause`.
    throw new Error(`Refund failed for order ${orderId}`, { cause: error });
  }
}

try {
  refundCustomer("ORD-7781", 499);
} catch (error) {
  const e = error as Error;
  console.log("What happened:", e.message);
  console.log("Root cause:  ", (e.cause as Error).message);
}

// Only handle what you understand; re-throw the rest.
function readConfig(text: string): Record<string, unknown> {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log("Config is not valid JSON, using defaults");
      return { theme: "light" };
    }
    throw error; // something unexpected: let a higher level decide
  }
}
console.log("Config:", readConfig('{"theme":"dark"}'));
console.log("Config:", readConfig("theme=dark"));

// Log in one place: here a tiny logger with a timestamp
function logError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.log(`[ERROR] ${context}: ${message}`);
}
logError("startup", new Error("Port 3000 already in use"));
