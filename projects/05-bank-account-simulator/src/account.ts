// A single account. Every method either succeeds fully or throws and changes nothing.

import { AccountFrozenError, DailyLimitError, InsufficientFundsError, InvalidAmountError } from "./errors.ts";

export interface Transaction {
  type: "deposit" | "withdraw" | "transfer-in" | "transfer-out";
  amount: number;
  balanceAfter: number;
}

function assertValidAmount(amount: number): void {
  const hasTooManyDecimals = Math.round(amount * 100) !== amount * 100;
  if (!Number.isFinite(amount) || amount <= 0 || hasTooManyDecimals) {
    throw new InvalidAmountError(amount);
  }
}

export class Account {
  private balance = 0;
  private withdrawnToday = 0;
  private frozen = false;
  readonly history: Transaction[] = [];

  constructor(readonly id: string, readonly owner: string, readonly dailyLimit = 20_000) {}

  get currentBalance(): number {
    return this.balance;
  }

  get isFrozen(): boolean {
    return this.frozen;
  }

  freeze(): void {
    this.frozen = true;
  }

  deposit(amount: number, type: Transaction["type"] = "deposit"): void {
    assertValidAmount(amount);
    if (this.frozen) throw new AccountFrozenError(this.id);
    this.balance += amount;
    this.history.push({ type, amount, balanceAfter: this.balance });
  }

  withdraw(amount: number, type: Transaction["type"] = "withdraw"): void {
    assertValidAmount(amount);
    if (this.frozen) throw new AccountFrozenError(this.id);
    if (amount > this.balance) throw new InsufficientFundsError(this.balance, amount);
    if (this.withdrawnToday + amount > this.dailyLimit) throw new DailyLimitError(this.dailyLimit);
    this.balance -= amount;
    this.withdrawnToday += amount;
    this.history.push({ type, amount, balanceAfter: this.balance });
  }
}
