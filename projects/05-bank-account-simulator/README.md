# Project 5: Bank Account Simulator

Chapter 5 project of *The 199 Series: TypeScript*. A mini bank that runs a file of commands
(deposit, withdraw, transfer, freeze) and shows how custom errors, validation, roll-back
and the Result pattern keep one bad command from breaking everything.

## Run

```bash
npx tsx projects/05-bank-account-simulator/src/main.ts
npx tsx projects/05-bank-account-simulator/src/main.ts my-commands.txt
```

## Files

| File | Job |
| --- | --- |
| `src/errors.ts` | `BankError` and one subclass per problem |
| `src/account.ts` | `Account`: validates, then changes balance and history |
| `src/bank.ts` | `Bank`: holds accounts, transfers with roll-back, turns errors into results |
| `src/main.ts` | Reads `data/commands.txt` and prints a report |
| `data/commands.txt` | Sample commands, including deliberate mistakes |
