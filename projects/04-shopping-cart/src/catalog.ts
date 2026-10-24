// The product catalog: a Map from SKU (stock keeping unit) to product.

export type Category = "grocery" | "electronics" | "books";

export interface Product {
  readonly sku: string;
  name: string;
  price: number; // in rupees
  category: Category;
  stock: number;
}

const products: Product[] = [
  { sku: "GR-RICE-5", name: "Basmati rice 5 kg", price: 650, category: "grocery", stock: 20 },
  { sku: "GR-TEA-1", name: "Assam tea 1 kg", price: 480, category: "grocery", stock: 15 },
  { sku: "EL-EARBUDS", name: "Wireless earbuds", price: 2499, category: "electronics", stock: 5 },
  { sku: "EL-CABLE", name: "USB-C cable", price: 299, category: "electronics", stock: 40 },
  { sku: "BK-TS199", name: "The 199 Series: TypeScript", price: 159, category: "books", stock: 100 },
];

export const catalog = new Map<string, Product>(products.map((p) => [p.sku, p]));

export function productsIn(category: Category): Product[] {
  return [...catalog.values()].filter((p) => p.category === category);
}
