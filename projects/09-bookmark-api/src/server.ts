// HTTP layer: parses requests, picks a route, sends JSON responses.

import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { BookmarkStore } from "./storage.ts";
import type { BookmarkInput } from "./types.ts";
import { validateInput } from "./validate.ts";

class HttpError extends Error {
  constructor(public status: number, message: string, public details?: string[]) {
    super(message);
  }
}

function send(res: ServerResponse, status: number, body?: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
  res.end(body === undefined ? undefined : JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10_000) throw new HttpError(413, "Body too large");
  }
  try {
    return JSON.parse(raw || "{}");
  } catch {
    throw new HttpError(400, "Body is not valid JSON");
  }
}

type Handler = (req: IncomingMessage, url: URL, params: string[]) => Promise<[number, unknown?]>;

export function createApp(store: BookmarkStore): Server {
  // The route table: method, path pattern, handler.
  const routes: Array<[string, RegExp, Handler]> = [
    ["GET", /^\/health$/, async () => [200, { status: "ok" }]],
    ["GET", /^\/bookmarks$/, async (_req, url) =>
      [200, store.list(url.searchParams.get("tag") ?? undefined, url.searchParams.get("q") ?? undefined)]],
    ["GET", /^\/bookmarks\/([\w-]+)$/, async (_req, _url, [id]) => {
      const b = store.get(id);
      if (!b) throw new HttpError(404, "Bookmark not found");
      return [200, b];
    }],
    ["POST", /^\/bookmarks$/, async (req) => {
      const check = validateInput(await readJson(req));
      if (!check.ok) throw new HttpError(400, "Invalid bookmark", check.errors);
      return [201, await store.create(check.value as BookmarkInput)];
    }],
    ["PATCH", /^\/bookmarks\/([\w-]+)$/, async (req, _url, [id]) => {
      const check = validateInput(await readJson(req), true);
      if (!check.ok) throw new HttpError(400, "Invalid changes", check.errors);
      const updated = await store.update(id, check.value);
      if (!updated) throw new HttpError(404, "Bookmark not found");
      return [200, updated];
    }],
    ["DELETE", /^\/bookmarks\/([\w-]+)$/, async (_req, _url, [id]) => {
      if (!(await store.remove(id))) throw new HttpError(404, "Bookmark not found");
      return [204];
    }],
  ];

  return createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    const started = Date.now();
    try {
      const pathMatches = routes.filter(([, pattern]) => pattern.test(url.pathname));
      if (pathMatches.length === 0) throw new HttpError(404, "Route not found");
      const route = pathMatches.find(([method]) => method === req.method);
      if (!route) throw new HttpError(405, "Method not allowed");
      const params = url.pathname.match(route[1])!.slice(1);
      const [status, body] = await route[2](req, url, params);
      send(res, status, body);
    } catch (error) {
      if (error instanceof HttpError) send(res, error.status, { error: error.message, details: error.details });
      else {
        console.error(error);
        send(res, 500, { error: "Internal server error" });
      }
    } finally {
      if (process.env.LOG_REQUESTS) console.log(`${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - started}ms`);
    }
  });
}
