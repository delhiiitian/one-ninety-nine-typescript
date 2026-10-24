// Runs every example and project once and reports which ones fail.
// Run: npm test

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

// Examples that need arguments, typed input, or a special runner
const special: Record<string, { args?: string[]; input?: string; test?: boolean; skip?: string }> = {
  "chapter-06-files-io/01-command-line-args.ts": { args: ["Asha", "2", "--loud"] },
  "chapter-06-files-io/02-reading-user-input.ts": { input: "Asha\nKochi\n2\n" },
  "chapter-07-modules-tooling/08-testing.ts": { test: true },
  "chapter-09-real-world/08-browser-dom.ts": { skip: "browser code: npm run build:browser" },
  "projects/02-number-guessing-game/src/main.ts": { args: ["easy", "--seed=42"], input: "10\n15\n12\n13\n" },
  "projects/06-todo-cli/src/cli.ts": { args: ["list"] },
  "projects/09-bookmark-api/src/main.ts": { skip: "long-running server: covered by demo.ts" },
};

const chapterFiles = readdirSync(root)
  .filter((d) => d.startsWith("chapter-"))
  .sort()
  .flatMap((d) => readdirSync(join(root, d)).filter((f) => f.endsWith(".ts")).sort().map((f) => `${d}/${f}`));

const projectFiles = readdirSync(join(root, "projects"))
  .sort()
  .flatMap((p) => ["main.ts", "cli.ts", "demo.ts"].map((f) => `projects/${p}/src/${f}`))
  .filter((f) => existsSync(join(root, f)));

const testFiles = readdirSync(join(root, "projects", "07-password-toolkit", "test")).map(
  (f) => `projects/07-password-toolkit/test/${f}`,
);

let passed = 0;
const failed: string[] = [];
const tsx = join(root, "node_modules", ".bin", "tsx");

for (const file of [...chapterFiles, ...projectFiles, ...testFiles]) {
  const opts = special[file] ?? {};
  if (opts.skip) {
    console.log(`SKIP  ${file} (${opts.skip})`);
    continue;
  }
  const isTest = opts.test || file.endsWith(".test.ts");
  const args = isTest ? ["--test", file] : [file, ...(opts.args ?? [])];
  const result = spawnSync(tsx, args, {
    cwd: root,
    input: opts.input ?? "",
    encoding: "utf8",
    timeout: 30_000,
    env: { ...process.env, TODO_FILE: join(root, "projects", "06-todo-cli", "data", "test-todos.json") },
  });
  if (result.status === 0) {
    passed++;
    console.log(`ok    ${file}`);
  } else {
    failed.push(file);
    console.log(`FAIL  ${file}\n${result.stdout}\n${result.stderr}`);
  }
}

console.log(`\n${passed} passed, ${failed.length} failed`);
if (failed.length) process.exitCode = 1;
