# Project 7: Password Toolkit

Chapter 7 project of *The 199 Series: TypeScript*. A small, well-organised library with a
public API, a command-line tool and automated tests: generate secure passwords and
passphrases, and score how strong a password is.

## Run

```bash
npx tsx projects/07-password-toolkit/src/cli.ts generate --length=20
npx tsx projects/07-password-toolkit/src/cli.ts generate --no-symbols
npx tsx projects/07-password-toolkit/src/cli.ts phrase --words=5
npx tsx projects/07-password-toolkit/src/cli.ts check "Summer2024"
```

## Test

```bash
npx tsx --test projects/07-password-toolkit/test/*.test.ts
```

## Files

| File | Job |
| --- | --- |
| `src/charsets.ts` | Character groups and the passphrase word list |
| `src/generator.ts` | Secure password and passphrase generation |
| `src/strength.ts` | Strength score, rating and tips |
| `src/index.ts` | The public API: the only file other code should import |
| `src/cli.ts` | Command-line interface |
| `test/*.test.ts` | Automated tests with `node:test` |
