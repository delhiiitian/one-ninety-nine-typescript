// A generic in-memory store that works for any record with an id.
// The same class could store customers, products or orders.

export class Repository<T extends { id: string }> {
  private items = new Map<string, T>();

  save(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  find(id: string): T | undefined {
    return this.items.get(id);
  }

  all(): T[] {
    return [...this.items.values()];
  }

  where<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.all().filter((item) => item[key] === value);
  }

  count(predicate: (item: T) => boolean = () => true): number {
    return this.all().filter(predicate).length;
  }
}
