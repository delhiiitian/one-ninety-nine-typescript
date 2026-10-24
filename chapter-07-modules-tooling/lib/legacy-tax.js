// An old plain-JavaScript file, written before the team used TypeScript.
// TypeScript learns its shape from legacy-tax.d.ts next to it.

export function incomeTax(income) {
  if (income <= 300000) return 0;
  if (income <= 700000) return (income - 300000) * 0.05;
  return 20000 + (income - 700000) * 0.1;
}

export const TAX_YEAR = "2026-27";
