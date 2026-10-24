// The bank holds accounts and runs commands. It turns thrown errors into Results,
// so one bad command never stops the whole batch.

import { Account } from "./account.ts";
import { AccountFrozenError, AccountNotFoundError, BankError } from "./errors.ts";

export type Result = { ok: true; message: string } | { ok: false; error: string; kind: string };

export class Bank {
  private accounts = new Map<string, Account>();

  open(id: string, owner: string): Account {
    const account = new Account(id, owner);
    this.accounts.set(id, account);
    return account;
  }

  get(id: string): Account {
    const account = this.accounts.get(id);
    if (!account) throw new AccountNotFoundError(id);
    return account;
  }

  transfer(fromId: string, toId: string, amount: number): void {
    const from = this.get(fromId);
    const to = this.get(toId);
    if (to.isFrozen) throw new AccountFrozenError(toId); // check before any money moves
    from.withdraw(amount, "transfer-out");
    try {
      to.deposit(amount, "transfer-in");
    } catch (error) {
      from.deposit(amount, "transfer-in"); // safety net: give the money back
      throw error;
    }
  }

  // Runs one text command such as "deposit A1 500" or "transfer A1 B2 250".
  run(command: string): Result {
    const [action, ...args] = command.trim().split(/\s+/);
    try {
      switch (action) {
        case "deposit": {
          const [id, amount] = args;
          this.get(id).deposit(Number(amount));
          return { ok: true, message: `Deposited ${amount} into ${id}` };
        }
        case "withdraw": {
          const [id, amount] = args;
          this.get(id).withdraw(Number(amount));
          return { ok: true, message: `Withdrew ${amount} from ${id}` };
        }
        case "transfer": {
          const [from, to, amount] = args;
          this.transfer(from, to, Number(amount));
          return { ok: true, message: `Transferred ${amount} from ${from} to ${to}` };
        }
        case "freeze": {
          this.get(args[0]).freeze();
          return { ok: true, message: `Froze ${args[0]}` };
        }
        default:
          return { ok: false, error: `Unknown command "${action}"`, kind: "SyntaxError" };
      }
    } catch (error) {
      if (error instanceof BankError) return { ok: false, error: error.message, kind: error.name };
      throw error; // a real bug: do not hide it
    }
  }

  statement(): string[] {
    return [...this.accounts.values()].map(
      (a) => `${a.id} ${a.owner.padEnd(8)} balance ${a.currentBalance.toFixed(2).padStart(10)}  (${a.history.length} transactions)`,
    );
  }
}
