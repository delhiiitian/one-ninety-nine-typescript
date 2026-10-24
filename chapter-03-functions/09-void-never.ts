// Chapter 3.9 - Special return types: void and never
// Run: npx tsx chapter-03-functions/09-void-never.ts
//
// Real-world picture: a doorbell (void) and an emergency stop button (never).
// The doorbell does its job and hands nothing back.
// The emergency button never returns control: everything halts.

function ringDoorbell(visitor: string): void {
  console.log(`Ding dong! ${visitor} is at the door.`);
}
ringDoorbell("The postman");

// never: the function cannot finish normally. It always throws (or loops forever).
function emergencyStop(reason: string): never {
  throw new Error(`Machine halted: ${reason}`);
}

try {
  emergencyStop("temperature too high");
} catch (error) {
  console.log("Caught:", (error as Error).message);
}

// The most useful job of never: making sure every case is handled.
type PaymentMethod = "card" | "upi" | "cash";

function paymentFee(method: PaymentMethod): number {
  switch (method) {
    case "card":
      return 2;
    case "upi":
      return 0;
    case "cash":
      return 0;
    default: {
      const unhandled: never = method; // error here if a new method is added and forgotten
      return unhandled;
    }
  }
}
console.log("Card fee:", paymentFee("card"), "| UPI fee:", paymentFee("upi"));
