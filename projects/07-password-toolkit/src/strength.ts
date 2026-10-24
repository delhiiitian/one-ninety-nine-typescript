// Estimates how hard a password is to guess.

export type Rating = "very weak" | "weak" | "fair" | "strong" | "very strong";

export interface StrengthReport {
  score: number; // 0 to 100
  rating: Rating;
  tips: string[];
}

const COMMON = new Set(["password", "123456", "qwerty", "iloveyou", "admin", "welcome", "letmein"]);

export function checkStrength(password: string): StrengthReport {
  const tips: string[] = [];
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26; else tips.push("Add lowercase letters");
  if (/[A-Z]/.test(password)) pool += 26; else tips.push("Add uppercase letters");
  if (/[0-9]/.test(password)) pool += 10; else tips.push("Add digits");
  if (/[^A-Za-z0-9]/.test(password)) pool += 32; else tips.push("Add symbols");
  if (password.length < 12) tips.push("Use 12 or more characters");

  // Entropy in bits: length x log2(pool size). 100 bits is far beyond brute force.
  const bits = password.length * Math.log2(Math.max(pool, 1));
  let score = Math.min(100, Math.round(bits));

  if (/(.)\1\1/.test(password)) {
    score -= 15;
    tips.push("Avoid repeating a character 3 times");
  }
  if (/(19|20)\d\d$/.test(password)) {
    score -= 20;
    tips.push("Avoid ending with a year; attackers try those first");
  }
  if (COMMON.has(password.toLowerCase())) {
    score = 0;
    tips.unshift("This is one of the most common passwords");
  }
  score = Math.max(0, score);

  const rating: Rating =
    score < 20 ? "very weak" : score < 40 ? "weak" : score < 60 ? "fair" : score < 80 ? "strong" : "very strong";
  return { score, rating, tips };
}
