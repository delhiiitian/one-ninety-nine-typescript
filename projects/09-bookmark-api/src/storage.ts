// Keeps bookmarks in memory and mirrors them to a JSON file after every change.

import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import type { Bookmark, BookmarkInput } from "./types.ts";

export class BookmarkStore {
  private items = new Map<string, Bookmark>();

  constructor(private file: string | null) {}

  async load(): Promise<void> {
    if (!this.file) return;
    try {
      const list = JSON.parse(await readFile(this.file, "utf8")) as Bookmark[];
      this.items = new Map(list.map((b) => [b.id, b]));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  private async persist(): Promise<void> {
    if (!this.file) return; // null file = memory only (used by tests)
    await mkdir(dirname(this.file), { recursive: true });
    await writeFile(this.file + ".tmp", JSON.stringify([...this.items.values()], null, 2));
    await rename(this.file + ".tmp", this.file);
  }

  list(tag?: string, search?: string): Bookmark[] {
    let result = [...this.items.values()];
    if (tag) result = result.filter((b) => b.tags.includes(tag));
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q));
    }
    return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  get(id: string): Bookmark | undefined {
    return this.items.get(id);
  }

  async create(input: BookmarkInput): Promise<Bookmark> {
    const bookmark: Bookmark = { id: randomUUID().slice(0, 8), ...input, createdAt: new Date().toISOString() };
    this.items.set(bookmark.id, bookmark);
    await this.persist();
    return bookmark;
  }

  async update(id: string, changes: Partial<BookmarkInput>): Promise<Bookmark | undefined> {
    const current = this.items.get(id);
    if (!current) return undefined;
    const updated = { ...current, ...changes };
    this.items.set(id, updated);
    await this.persist();
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const existed = this.items.delete(id);
    if (existed) await this.persist();
    return existed;
  }
}
