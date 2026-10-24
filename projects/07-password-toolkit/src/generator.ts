// Password and passphrase generation using the secure random source from node:crypto.

import { randomInt } from "node:crypto";
import { DIGITS, LOWER, SYMBOLS, UPPER, WORDS } from "./charsets.ts";

export interface PasswordOptions {
  length: number;
  upper?: boolean;
  digits?: boolean;
  symbols?: boolean;
}

const pick = (chars: string): string => chars[randomInt(chars.length)];

export function generatePassword({ length, upper = true, digits = true, symbols = true }: PasswordOptions): string {
  if (!Number.isInteger(length) || length < 8 || length > 128) {
    throw new RangeError("Length must be a whole number from 8 to 128");
  }
  const groups = [LOWER, upper && UPPER, digits && DIGITS, symbols && SYMBOLS].filter(
    (g): g is string => typeof g === "string",
  );

  // One character from each chosen group guarantees variety; the rest are random.
  const chars = groups.map(pick);
  const all = groups.join("");
  while (chars.length < length) chars.push(pick(all));

  // Shuffle (Fisher-Yates) so the guaranteed characters are not always at the front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

export function generatePassphrase(wordCount = 4, separator = "-"): string {
  if (wordCount < 3) throw new RangeError("Use at least 3 words");
  const words = Array.from({ length: wordCount }, () => WORDS[randomInt(WORDS.length)]);
  return words.join(separator) + separator + randomInt(10, 100);
}
