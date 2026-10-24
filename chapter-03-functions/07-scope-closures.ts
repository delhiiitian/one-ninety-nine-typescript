// Chapter 3.7 - Scope and closures
// Run: npx tsx chapter-03-functions/07-scope-closures.ts
//
// Real-world picture: a piggy bank. Only the slot (the function you get back)
// can change the money inside. Nobody can reach in directly.

function createPiggyBank(owner: string) {
  let balance = 0; // private: lives inside this function's scope

  return {
    deposit(amount: number): void {
      balance += amount;
      console.log(`${owner} deposited ${amount}. Balance: ${balance}`);
    },
    getBalance(): number {
      return balance;
    },
  };
}

const myBank = createPiggyBank("Aarav");
myBank.deposit(50);
myBank.deposit(20);
console.log("Final balance:", myBank.getBalance());
// console.log(balance); // Error: Cannot find name 'balance'.

// Each call creates a separate, independent closure.
const sisterBank = createPiggyBank("Anya");
sisterBank.deposit(100);
console.log("Aarav still has:", myBank.getBalance());

// A counter for ticket numbers
function makeTicketCounter(prefix: string) {
  let next = 1;
  return () => `${prefix}-${String(next++).padStart(3, "0")}`;
}
const nextTicket = makeTicketCounter("Q");
console.log(nextTicket(), nextTicket(), nextTicket());
