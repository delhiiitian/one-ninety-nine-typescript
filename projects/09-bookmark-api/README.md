# Project 9: Bookmark API

Chapter 9 project of *The 199 Series: TypeScript*. A small but complete REST API for saving
web bookmarks: routing, JSON validation, error responses with proper status codes, and
file storage, using only Node's built-in modules.

## Run

```bash
npx tsx projects/09-bookmark-api/src/demo.ts     # self-test: starts, calls every route, stops
npx tsx projects/09-bookmark-api/src/main.ts     # real server on http://localhost:3000
```

## Routes

| Method | Path | Does |
| --- | --- | --- |
| GET | `/health` | Health check |
| GET | `/bookmarks?tag=docs&q=node` | List, optionally filtered by tag or search text |
| GET | `/bookmarks/:id` | One bookmark |
| POST | `/bookmarks` | Create (`url`, `title`, optional `tags`) |
| PATCH | `/bookmarks/:id` | Change some fields |
| DELETE | `/bookmarks/:id` | Delete |

## Files

| File | Job |
| --- | --- |
| `src/types.ts` | `Bookmark` and `BookmarkInput` types |
| `src/validate.ts` | Checks untrusted request bodies |
| `src/storage.ts` | `BookmarkStore`: in-memory Map mirrored to a JSON file |
| `src/server.ts` | Route table, JSON responses, error handling |
| `src/main.ts` | Starts the real server |
| `src/demo.ts` | Self-test client |
