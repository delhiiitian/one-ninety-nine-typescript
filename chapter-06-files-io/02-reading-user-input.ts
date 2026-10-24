// Chapter 6.2 - Reading user input from the keyboard
// Run: npx tsx chapter-06-files-io/02-reading-user-input.ts
//
// Real-world picture: a ticket counter. The clerk asks a question, waits for
// your answer, then asks the next question.

import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin });
const lines = rl[Symbol.asyncIterator]();

// Print a question, then wait for the next line the user types.
async function ask(question: string): Promise<string> {
  stdout.write(question);
  const next = await lines.next();
  return next.done ? "" : next.value.trim();
}

const name = (await ask("What is your name? ")) || "traveller";
const destination = (await ask("Where are you going? ")) || "Goa";
const ticketsText = await ask("How many tickets? ");
rl.close();

const tickets = Number(ticketsText);
if (!Number.isInteger(tickets) || tickets < 1) {
  console.log(`\nSorry ${name}, "${ticketsText}" is not a valid number of tickets.`);
} else {
  const pricePerTicket = 750;
  console.log(`\n${name}, here are ${tickets} ticket(s) to ${destination}.`);
  console.log(`Total: Rs ${tickets * pricePerTicket}`);
}
