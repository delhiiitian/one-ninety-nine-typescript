// Todo CLI
//   npx tsx projects/06-todo-cli/src/cli.ts add "Buy milk" --high
//   npx tsx projects/06-todo-cli/src/cli.ts list
//   npx tsx projects/06-todo-cli/src/cli.ts done 1
//   npx tsx projects/06-todo-cli/src/cli.ts remove 1
//   npx tsx projects/06-todo-cli/src/cli.ts clear
// Data file: projects/06-todo-cli/data/todos.json (or set TODO_FILE)

import { join } from "node:path";
import { load, save } from "./store.ts";
import { addTodo, clearDone, markDone, removeTodo, sorted, type Priority, type Todo } from "./todos.ts";

const file = process.env.TODO_FILE ?? join(import.meta.dirname, "..", "data", "todos.json");
const [command = "list", ...rest] = process.argv.slice(2);

function print(list: Todo[]): void {
  if (list.length === 0) {
    console.log("Nothing to do. Add one with: add \"Task title\"");
    return;
  }
  for (const t of sorted(list)) {
    const box = t.done ? "[x]" : "[ ]";
    const flag = t.priority === "high" ? " (!)" : t.priority === "low" ? " (low)" : "";
    console.log(`${box} ${String(t.id).padStart(3)}  ${t.title}${flag}`);
  }
  const left = list.filter((t) => !t.done).length;
  console.log(`\n${left} of ${list.length} left`);
}

function parseId(text: string | undefined): number {
  const id = Number(text);
  if (!Number.isInteger(id) || id < 1) throw new Error(`"${text}" is not a valid id`);
  return id;
}

try {
  let todos = await load(file);
  switch (command) {
    case "add": {
      const title = rest.filter((a) => !a.startsWith("--")).join(" ").trim();
      if (!title) throw new Error('Please give a title, e.g. add "Pay electricity bill"');
      const priority: Priority = rest.includes("--high") ? "high" : rest.includes("--low") ? "low" : "normal";
      todos = addTodo(todos, title, priority);
      console.log(`Added #${todos[todos.length - 1].id}: ${title}`);
      break;
    }
    case "done":
      todos = markDone(todos, parseId(rest[0]));
      console.log(`Completed #${rest[0]}`);
      break;
    case "remove":
      todos = removeTodo(todos, parseId(rest[0]));
      console.log(`Removed #${rest[0]}`);
      break;
    case "clear":
      todos = clearDone(todos);
      console.log("Cleared completed todos");
      break;
    case "list":
      print(todos);
      break;
    default:
      throw new Error(`Unknown command "${command}". Use add, list, done, remove or clear.`);
  }
  if (command !== "list") await save(file, todos);
} catch (error) {
  console.error("Error:", (error as Error).message);
  process.exitCode = 1;
}
