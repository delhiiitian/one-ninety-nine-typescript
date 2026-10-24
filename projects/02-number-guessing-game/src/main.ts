// Number Guessing Game - play in the terminal
// Run: npx tsx projects/02-number-guessing-game/src/main.ts [easy|medium|hard] [--seed=42]

import { createInterface } from "node:readline";
import { createRandom, randomInt } from "./random.ts";
import { hint, judge, score, settingsFor, type Difficulty } from "./game.ts";

const args = process.argv.slice(2);
const levelArg = args.find((a) => !a.startsWith("--")) ?? "easy";
const seedArg = args.find((a) => a.startsWith("--seed="));

const levels: Difficulty[] = ["easy", "medium", "hard"];
const level: Difficulty = levels.includes(levelArg as Difficulty) ? (levelArg as Difficulty) : "easy";
const settings = settingsFor(level);
const random = createRandom(seedArg ? Number(seedArg.split("=")[1]) : undefined);
const secret = randomInt(random, 1, settings.max);

const rl = createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

console.log(`I am thinking of a number from 1 to ${settings.max} (${level} mode).`);
console.log(`You have ${settings.attempts} attempts. Type q to quit.\n`);

let attemptsUsed = 0;
let won = false;

while (attemptsUsed < settings.attempts) {
  process.stdout.write(`Guess #${attemptsUsed + 1}: `);
  const next = await lines.next();
  if (next.done) break;            // input ended (for example, piped input ran out)
  const text = next.value.trim();
  if (!process.stdin.isTTY) console.log(text); // echo piped input so the log reads well
  if (text.toLowerCase() === "q") break;

  const guess = Number(text);
  const verdict = judge(guess, secret, settings.max);

  if (verdict === "invalid") {
    console.log(`  Please type a whole number from 1 to ${settings.max}.`);
    continue;                      // invalid input does not cost an attempt
  }
  attemptsUsed++;

  if (verdict === "correct") {
    won = true;
    break;
  }
  const direction = verdict === "too-low" ? "higher" : "lower";
  console.log(`  Go ${direction}. ${hint(guess, secret)}. Attempts left: ${settings.attempts - attemptsUsed}`);
}
rl.close();

if (won) {
  console.log(`\nCorrect! The number was ${secret}. You needed ${attemptsUsed} attempt(s).`);
  console.log(`Score: ${score(attemptsUsed, settings)}`);
} else {
  console.log(`\nGame over. The number was ${secret}.`);
}
