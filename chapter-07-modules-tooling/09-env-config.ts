// Chapter 7.9 - Configuration with environment variables
// Run: PORT=8080 APP_MODE=production npx tsx chapter-07-modules-tooling/09-env-config.ts
//
// Real-world picture: a thermostat. The heater (your code) is the same in every house;
// each house sets its own temperature (configuration) on the wall.

interface Config {
  port: number;
  mode: "development" | "production";
  apiKey: string | undefined;
  maxUploadMb: number;
}

function readNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (Number.isNaN(value)) throw new Error(`${name} must be a number, got "${raw}"`);
  return value;
}

function loadConfig(): Config {
  const mode = process.env.APP_MODE === "production" ? "production" : "development";
  return {
    port: readNumber("PORT", 3000),
    mode,
    apiKey: process.env.API_KEY,
    maxUploadMb: readNumber("MAX_UPLOAD_MB", 10),
  };
}

const config = loadConfig();
console.table({ ...config, apiKey: config.apiKey ? "****" : "(not set)" }); // never print secrets

if (config.mode === "production" && !config.apiKey) {
  console.log("Warning: API_KEY is required in production");
}

// Secrets (passwords, API keys) belong in environment variables or a .env file
// that is listed in .gitignore, never in the code you push to GitHub.
// Node 20.6+ can load a .env file for you:  node --env-file=.env app.js
