// Conversion logic built from small functions.

import { UNITS, type Unit } from "./units.ts";

export type Conversion = { ok: true; value: number; from: Unit; to: Unit } | { ok: false; error: string };

function findUnit(symbol: string): Unit | undefined {
  return UNITS[symbol.toLowerCase()];
}

export function convert(value: number, fromSymbol: string, toSymbol: string): Conversion {
  const from = findUnit(fromSymbol);
  const to = findUnit(toSymbol);
  if (!from) return { ok: false, error: `Unknown unit "${fromSymbol}"` };
  if (!to) return { ok: false, error: `Unknown unit "${toSymbol}"` };
  if (from.category !== to.category) {
    return { ok: false, error: `Cannot convert ${from.category} (${from.name}) to ${to.category} (${to.name})` };
  }
  if (!Number.isFinite(value)) return { ok: false, error: "Value must be a number" };
  return { ok: true, value: to.fromBase(from.toBase(value)), from, to };
}

// Parses text like "10 km to mi" or "98.6 f in c".
export function parseQuery(text: string): [number, string, string] | null {
  const match = text.trim().match(/^(-?\d+(?:\.\d+)?)\s*([a-z]+)\s+(?:to|in)\s+([a-z]+)$/i);
  if (!match) return null;
  return [Number(match[1]), match[2], match[3]];
}

// A higher-order function: returns a ready-made converter for one pair of units.
export function makeConverter(fromSymbol: string, toSymbol: string): (value: number) => number {
  return (value) => {
    const result = convert(value, fromSymbol, toSymbol);
    if (!result.ok) throw new Error(result.error);
    return result.value;
  };
}

export function round(value: number, digits = 4): number {
  return Number(value.toFixed(digits));
}
