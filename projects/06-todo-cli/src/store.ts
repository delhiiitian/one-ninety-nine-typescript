// Loading and saving the list as JSON. The only file in the project that touches the disk.

import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { dirname } from "node:path";
import type { Todo } from "./todos.ts";

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.id === "number" &&
    typeof t.title === "string" &&
    (t.priority === "low" || t.priority === "normal" || t.priority === "high") &&
    typeof t.done === "boolean" &&
    typeof t.createdAt === "string"
  );
}

export async function load(file: string): Promise<Todo[]> {
  let text: string;
  try {
    text = await readFile(file, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; // first run: no file yet
    throw error;
  }
  const data: unknown = JSON.parse(text);
  if (!Array.isArray(data) || !data.every(isTodo)) {
    throw new Error(`${file} is not a valid todo file`);
  }
  return data;
}

export async function save(file: string, todos: Todo[]): Promise<void> {
  await mkdir(dirname(file), { recursive: true });
  // Write to a temporary file first, then rename: a crash never leaves a half-written file.
  const temp = file + ".tmp";
  await writeFile(temp, JSON.stringify(todos, null, 2) + "\n", "utf8");
  await rename(temp, file);
}
