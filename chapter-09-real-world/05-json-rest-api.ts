// Chapter 9.5 - A JSON REST API with routes
// Run: npx tsx chapter-09-real-world/05-json-rest-api.ts --keep   (then try: curl localhost:3000/books)
// Without --keep, it runs a self-test and stops.
//
// Real-world picture: a library desk with separate windows:
// "list all books", "show one book", "add a book", "return (delete) a book".
// The HTTP method + path decide which window you go to.

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

interface Book { id: number; title: string; author: string }

const books: Book[] = [
  { id: 1, title: "Malgudi Days", author: "R. K. Narayan" },
  { id: 2, title: "Wings of Fire", author: "A. P. J. Abdul Kalam" },
];
let nextId = 3;

function send(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

async function router(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const match = url.pathname.match(/^\/books\/(\d+)$/);

  if (req.method === "GET" && url.pathname === "/books") return send(res, 200, books);

  if (req.method === "GET" && match) {
    const book = books.find((b) => b.id === Number(match[1]));
    return book ? send(res, 200, book) : send(res, 404, { error: "Book not found" });
  }

  if (req.method === "POST" && url.pathname === "/books") {
    const body = (await readBody(req)) as Partial<Book>;
    if (!body.title || !body.author) return send(res, 400, { error: "title and author are required" });
    const book: Book = { id: nextId++, title: body.title, author: body.author };
    books.push(book);
    return send(res, 201, book);
  }

  if (req.method === "DELETE" && match) {
    const index = books.findIndex((b) => b.id === Number(match[1]));
    if (index === -1) return send(res, 404, { error: "Book not found" });
    books.splice(index, 1);
    return send(res, 204, null);
  }

  send(res, 404, { error: "Route not found" });
}

const keep = process.argv.includes("--keep");
const server = createServer((req, res) => {
  router(req, res).catch(() => send(res, 400, { error: "Invalid JSON" }));
});
server.listen(keep ? 3000 : 0, async () => {
  const port = (server.address() as { port: number }).port;
  console.log(`API on http://localhost:${port}`);
  if (keep) return;

  const base = `http://localhost:${port}`;
  const show = async (label: string, r: Response) =>
    console.log(label.padEnd(22), r.status, r.status === 204 ? "" : JSON.stringify(await r.json()));

  await show("GET /books", await fetch(`${base}/books`));
  await show("POST /books", await fetch(`${base}/books`, {
    method: "POST",
    body: JSON.stringify({ title: "The Guide", author: "R. K. Narayan" }),
  }));
  await show("POST /books (bad)", await fetch(`${base}/books`, { method: "POST", body: "{}" }));
  await show("GET /books/3", await fetch(`${base}/books/3`));
  await show("DELETE /books/1", await fetch(`${base}/books/1`, { method: "DELETE" }));
  await show("GET /books/1", await fetch(`${base}/books/1`));
  server.close();
});
