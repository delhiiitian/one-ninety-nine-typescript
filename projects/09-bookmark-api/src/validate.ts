// Checks untrusted JSON from HTTP requests before it reaches the rest of the app.

import type { BookmarkInput } from "./types.ts";

export type Validation<T> = { ok: true; value: T } | { ok: false; errors: string[] };

export function validateInput(body: unknown, partial = false): Validation<Partial<BookmarkInput>> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { ok: false, errors: ["Body must be a JSON object"] };
  }
  const b = body as Record<string, unknown>;
  const errors: string[] = [];
  const value: Partial<BookmarkInput> = {};

  if (b.url !== undefined || !partial) {
    if (typeof b.url !== "string" || !isHttpUrl(b.url)) errors.push("url must be an http(s) address");
    else value.url = b.url;
  }
  if (b.title !== undefined || !partial) {
    if (typeof b.title !== "string" || b.title.trim() === "" || b.title.length > 200)
      errors.push("title must be 1 to 200 characters");
    else value.title = b.title.trim();
  }
  if (b.tags !== undefined) {
    if (!Array.isArray(b.tags) || !b.tags.every((t) => typeof t === "string" && /^[a-z0-9-]{1,30}$/.test(t)))
      errors.push("tags must be a list of lowercase words");
    else value.tags = [...new Set(b.tags as string[])];
  } else if (!partial) {
    value.tags = [];
  }
  return errors.length ? { ok: false, errors } : { ok: true, value };
}

function isHttpUrl(text: string): boolean {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
