// One error class per kind of problem, so callers can react differently to each.

export class BankError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name; // "InsufficientFundsError", etc.
  }
}

export class InvalidAmountError extends BankError {
  constructor(public amount: number) {
    super(`Invalid amount: ${amount}. Use a positive number with at most 2 decimals.`);
  }
}

export class InsufficientFundsError extends BankError {
  constructor(public balance: number, public requested: number) {
    super(`Insufficient funds: balance ${balance.toFixed(2)}, requested ${requested.toFixed(2)}`);
  }
}

export class AccountNotFoundError extends BankError {
  constructor(public accountId: string) {
    super(`Account ${accountId} does not exist`);
  }
}

export class AccountFrozenError extends BankError {
  constructor(public accountId: string) {
    super(`Account ${accountId} is frozen`);
  }
}

export class DailyLimitError extends BankError {
  constructor(public limit: number) {
    super(`Daily withdrawal limit of ${limit} reached`);
  }
}
