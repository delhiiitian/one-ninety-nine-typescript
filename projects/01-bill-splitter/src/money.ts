// Money helpers. Amounts are kept in paise (whole numbers) to avoid decimal errors
// like 0.1 + 0.2 = 0.30000000000000004.

export type Paise = number;

export function toPaise(rupees: number): Paise {
  return Math.round(rupees * 100);
}

export function formatRupees(paise: Paise): string {
  const rupees = paise / 100;
  return "Rs " + rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function percentOf(amount: Paise, percent: number): Paise {
  return Math.round((amount * percent) / 100);
}
