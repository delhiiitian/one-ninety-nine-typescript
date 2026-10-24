# Project 2: Number Guessing Game

Chapter 2 project of *The 199 Series: TypeScript*. The computer picks a secret number;
you guess, and it answers "higher", "lower" and "hot or cold" until you win or run out of tries.

## Run

```bash
npx tsx projects/02-number-guessing-game/src/main.ts medium
# Same secret number every time (useful for testing):
npx tsx projects/02-number-guessing-game/src/main.ts easy --seed=42
# Play automatically from piped answers:
printf "10\n5\n3\n" | npx tsx projects/02-number-guessing-game/src/main.ts easy --seed=42
```

## Files

| File | Job |
| --- | --- |
| `src/random.ts` | Random numbers, optionally from a fixed seed |
| `src/game.ts` | Rules: difficulty settings, judging a guess, hints, score |
| `src/main.ts` | The game loop: reads guesses and prints replies |
