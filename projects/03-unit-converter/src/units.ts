// Every unit knows how to go to and from one "base" unit of its category.
// Adding a unit = adding one line. No if/else chains needed.

export type Category = "length" | "weight" | "temperature" | "volume";

export interface Unit {
  name: string;
  category: Category;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

// Helper: build a unit that is just "times a factor" of the base unit.
function linear(name: string, category: Category, factor: number): Unit {
  return { name, category, toBase: (v) => v * factor, fromBase: (v) => v / factor };
}

export const UNITS: Record<string, Unit> = {
  // length, base = metre
  m: linear("metre", "length", 1),
  km: linear("kilometre", "length", 1000),
  cm: linear("centimetre", "length", 0.01),
  mi: linear("mile", "length", 1609.344),
  ft: linear("foot", "length", 0.3048),
  in: linear("inch", "length", 0.0254),
  // weight, base = kilogram
  kg: linear("kilogram", "weight", 1),
  g: linear("gram", "weight", 0.001),
  lb: linear("pound", "weight", 0.45359237),
  // volume, base = litre
  l: linear("litre", "volume", 1),
  ml: linear("millilitre", "volume", 0.001),
  gal: linear("US gallon", "volume", 3.785411784),
  // temperature, base = Celsius (not linear, so written by hand)
  c: { name: "Celsius", category: "temperature", toBase: (v) => v, fromBase: (v) => v },
  f: { name: "Fahrenheit", category: "temperature", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
  k: { name: "Kelvin", category: "temperature", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
};
