// Chapter 9.3 - Fetching data from a web API
// Run: npx tsx chapter-09-real-world/03-fetch-api.ts
//
// Real-world picture: ordering from a menu over the phone. You call a number (URL),
// ask for something (request), and receive a packed order (JSON response).
//
// To work offline, this file starts a tiny fake weather service first,
// then calls it with fetch exactly like a real public API.

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const server = createServer((req, res) => {
  const city = new URL(req.url ?? "/", "http://x").searchParams.get("city") ?? "Delhi";
  if (city === "Atlantis") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "City not found" }));
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ city, tempC: 27, condition: "Partly cloudy" }));
});
await new Promise<void>((resolve) => server.listen(0, resolve));
const baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;

interface Weather {
  city: string;
  tempC: number;
  condition: string;
}

async function getWeather(city: string): Promise<Weather> {
  const response = await fetch(`${baseUrl}/weather?city=${encodeURIComponent(city)}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as Weather;
}

for (const city of ["Hyderabad", "Atlantis"]) {
  try {
    const w = await getWeather(city);
    console.log(`${w.city}: ${w.tempC}°C, ${w.condition}`);
  } catch (e) {
    console.log(`${city}: ${(e as Error).message}`);
  }
}

// Sending data: a POST request with a JSON body
const posted = await fetch(`${baseUrl}/weather?city=Pune`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ subscribe: true }),
});
console.log("POST status:", posted.status);

server.close();
// Real public API to try: await fetch("https://api.github.com/users/octocat")
