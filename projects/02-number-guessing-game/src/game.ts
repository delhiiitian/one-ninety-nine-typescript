// Game rules only. No keyboard, no console: just decisions.

export type Difficulty = "easy" | "medium" | "hard";

export interface GameSettings {
  max: number;
  attempts: number;
}

export function settingsFor(level: Difficulty): GameSettings {
  switch (level) {
    case "easy":
      return { max: 20, attempts: 6 };
    case "medium":
      return { max: 50, attempts: 7 };
    case "hard":
      return { max: 100, attempts: 7 };
  }
}

export type Verdict = "too-low" | "too-high" | "correct" | "invalid";

export function judge(guess: number, secret: number, max: number): Verdict {
  if (!Number.isInteger(guess) || guess < 1 || guess > max) return "invalid";
  if (guess < secret) return "too-low";
  if (guess > secret) return "too-high";
  return "correct";
}

export function hint(guess: number, secret: number): string {
  const distance = Math.abs(guess - secret);
  if (distance <= 2) return "Very hot";
  if (distance <= 5) return "Hot";
  if (distance <= 10) return "Warm";
  return "Cold";
}

export function score(attemptsUsed: number, settings: GameSettings): number {
  return Math.max(0, (settings.attempts - attemptsUsed + 1) * settings.max);
}
