// The calculation core: no printing, no input. Easy to test and reuse.

import { percentOf, type Paise } from "./money.ts";

export interface BillInput {
  subtotal: Paise;
  taxPercent: number;
  tipPercent: number;
  people: number;
}

export interface BillResult {
  subtotal: Paise;
  tax: Paise;
  tip: Paise;
  total: Paise;
  shares: Paise[]; // one entry per person; they always add up to total exactly
}

export function validate(input: BillInput): string[] {
  const problems: string[] = [];
  if (!Number.isFinite(input.subtotal) || input.subtotal <= 0) problems.push("Bill amount must be more than 0");
  if (input.taxPercent < 0 || input.taxPercent > 50) problems.push("Tax must be between 0 and 50%");
  if (input.tipPercent < 0 || input.tipPercent > 100) problems.push("Tip must be between 0 and 100%");
  if (!Number.isInteger(input.people) || input.people < 1) problems.push("People must be a whole number, 1 or more");
  return problems;
}

export function splitBill(input: BillInput): BillResult {
  const tax = percentOf(input.subtotal, input.taxPercent);
  const tip = percentOf(input.subtotal, input.tipPercent); // tip on the pre-tax amount
  const total = input.subtotal + tax + tip;

  // Share fairly: everyone pays the base share, the first few pay 1 paisa extra
  const base = Math.floor(total / input.people);
  const remainder = total % input.people;
  const shares = Array.from({ length: input.people }, (_, i) => base + (i < remainder ? 1 : 0));

  return { subtotal: input.subtotal, tax, tip, total, shares };
}
