# Project 6: Todo List CLI

Chapter 6 project of *The 199 Series: TypeScript*. A command-line todo list that remembers
your tasks in a JSON file between runs.

## Run

```bash
npx tsx projects/06-todo-cli/src/cli.ts add "Buy milk" --high
npx tsx projects/06-todo-cli/src/cli.ts add "Read chapter 6"
npx tsx projects/06-todo-cli/src/cli.ts done 1
npx tsx projects/06-todo-cli/src/cli.ts list
npx tsx projects/06-todo-cli/src/cli.ts clear
```

Tasks are stored in `projects/06-todo-cli/data/todos.json`. Set `TODO_FILE=/some/path.json` to use another file.

## Files

| File | Job |
| --- | --- |
| `src/todos.ts` | Pure functions: add, done, remove, clear, sort |
| `src/store.ts` | Load and save JSON safely, with validation |
| `src/cli.ts` | Reads the command and arguments, prints results |
