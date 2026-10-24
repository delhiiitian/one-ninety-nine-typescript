// Bookmark API - self-test: starts the server on a free port, calls every route, stops.
// Run: npx tsx projects/09-bookmark-api/src/demo.ts

import type { AddressInfo } from "node:net";
import { createApp } from "./server.ts";
import { BookmarkStore } from "./storage.ts";

const store = new BookmarkStore(null); // memory only
const server = createApp(store);
await new Promise<void>((resolve) => server.listen(0, resolve));
const base = `http://localhost:${(server.address() as AddressInfo).port}`;

async function call(method: string, path: string, body?: unknown): Promise<any> {
  const res = await fetch(base + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
  const data = res.status === 204 ? null : await res.json();
  console.log(`${method.padEnd(6)} ${path.padEnd(28)} ${res.status}  ${data ? JSON.stringify(data).slice(0, 70) : ""}`);
  return data;
}

await call("GET", "/health");
const ts = await call("POST", "/bookmarks", { url: "https://www.typescriptlang.org", title: "TypeScript", tags: ["docs", "ts"] });
await call("POST", "/bookmarks", { url: "https://nodejs.org/api", title: "Node.js API", tags: ["docs"] });
await call("POST", "/bookmarks", { url: "ftp://old.site", title: "" });
await call("POST", "/bookmarks", "{not json");
await call("GET", "/bookmarks?tag=docs");
await call("GET", "/bookmarks?q=node");
await call("PATCH", `/bookmarks/${ts.id}`, { title: "TypeScript Handbook" });
await call("GET", `/bookmarks/${ts.id}`);
await call("DELETE", `/bookmarks/${ts.id}`);
await call("GET", `/bookmarks/${ts.id}`);
await call("PUT", "/bookmarks");
await call("GET", "/nothing-here");

server.close();
