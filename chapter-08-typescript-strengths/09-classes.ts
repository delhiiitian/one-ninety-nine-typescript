// Chapter 8.9 - Classes, access modifiers and implements
// Run: npx tsx chapter-08-typescript-strengths/09-classes.ts
//
// Real-world picture: a house blueprint. One blueprint (class) builds many houses
// (objects). Some rooms are public (living room), some private (the safe).

interface Account {
  readonly owner: string;
  deposit(amount: number): void;
  get balance(): number;
}

class SavingsAccount implements Account {
  private _balance = 0;                    // only code inside this class can touch it
  protected interestRate = 0.04;           // this class and its children
  static readonly bankName = "TS Bank";    // shared by all accounts

  constructor(public readonly owner: string, opening: number) {
    this.deposit(opening);
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this._balance += amount;
  }

  get balance(): number {
    return this._balance;
  }

  addYearlyInterest(): void {
    this._balance = Math.round(this._balance * (1 + this.interestRate));
  }
}

// Inheritance: a child class reuses and changes the parent
class SeniorSavingsAccount extends SavingsAccount {
  protected interestRate = 0.075;
}

const a = new SavingsAccount("Neel", 10_000);
const b = new SeniorSavingsAccount("Mrs. Das", 10_000);
a.addYearlyInterest();
b.addYearlyInterest();

console.log(`${SavingsAccount.bankName}`);
console.log(`${a.owner}: Rs ${a.balance}`);
console.log(`${b.owner}: Rs ${b.balance}`);
// a._balance = 1_000_000; // Error: Property '_balance' is private.

// Code can depend on the interface, not the class.
function printStatement(acc: Account): void {
  console.log(`Statement for ${acc.owner}: Rs ${acc.balance}`);
}
[a, b].forEach(printStatement);
