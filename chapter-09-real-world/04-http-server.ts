// Chapter 9.4 - Building a small web server
// Run: npx tsx chapter-09-real-world/04-http-server.ts --keep   (then open http://localhost:3000)
// Without --keep, it starts, answers a few test requests and stops.
//
// Real-world picture: a shop counter. The server waits at the counter,
// a customer (browser) asks for something, and the server hands it over.

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

let visits = 0;

function handle(req: IncomingMessage, res: ServerResponse): void {
  visits++;
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>Welcome to the TS shop</h1><p>You are visitor #${visits}</p>`);
  } else if (req.url === "/time") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Server time: ${new Date().toISOString()}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
}

const keep = process.argv.includes("--keep");
const port = keep ? 3000 : 0; // 0 = any free port, for the self-test
const server = createServer(handle);

server.listen(port, async () => {
  const address = server.address();
  const actualPort = typeof address === "object" && address ? address.port : port;
  console.log(`Listening on http://localhost:${actualPort}`);

  if (!keep) {
    for (const path of ["/", "/time", "/missing"]) {
      const r = await fetch(`http://localhost:${actualPort}${path}`);
      console.log(`  -> ${r.status} ${(await r.text()).slice(0, 50)}`);
    }
    server.close(() => console.log("Server stopped"));
  }
});
