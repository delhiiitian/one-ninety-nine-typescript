// Character groups used by the generator and the strength checker.

export const LOWER = "abcdefghijkmnopqrstuvwxyz"; // no "l": looks like 1
export const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";  // no "I" or "O"
export const DIGITS = "23456789";                  // no 0 or 1
export const SYMBOLS = "!@#$%^&*-_=+?";

export const WORDS = [
  "mango", "river", "kite", "lamp", "tiger", "cloud", "pepper", "rocket",
  "garden", "silver", "monsoon", "bamboo", "chai", "violin", "planet", "honey",
] as const;
