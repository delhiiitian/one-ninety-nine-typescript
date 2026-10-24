// Bookmark API - start the server
// Run: npx tsx projects/09-bookmark-api/src/main.ts
// Then: curl -X POST localhost:3000/bookmarks -d '{"url":"https://nodejs.org","title":"Node.js","tags":["docs"]}'

import { join } from "node:path";
import { createApp } from "./server.ts";
import { BookmarkStore } from "./storage.ts";

const port = Number(process.env.PORT ?? 3000);
const file = process.env.BOOKMARKS_FILE ?? join(import.meta.dirname, "..", "data", "bookmarks.json");

const store = new BookmarkStore(file);
await store.load();

process.env.LOG_REQUESTS ??= "1";
createApp(store).listen(port, () => {
  console.log(`Bookmark API running on http://localhost:${port}`);
  console.log(`Saving to ${file}. Press Ctrl+C to stop.`);
});
