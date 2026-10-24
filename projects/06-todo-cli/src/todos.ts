// Pure todo-list operations: take a list, return a new list. No files involved.

export type Priority = "low" | "normal" | "high";

export interface Todo {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: string; // ISO date text, because JSON has no Date type
}

export function addTodo(list: Todo[], title: string, priority: Priority, now = new Date()): Todo[] {
  const id = list.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  return [...list, { id, title, priority, done: false, createdAt: now.toISOString() }];
}

export function markDone(list: Todo[], id: number): Todo[] {
  if (!list.some((t) => t.id === id)) throw new Error(`No todo with id ${id}`);
  return list.map((t) => (t.id === id ? { ...t, done: true } : t));
}

export function removeTodo(list: Todo[], id: number): Todo[] {
  if (!list.some((t) => t.id === id)) throw new Error(`No todo with id ${id}`);
  return list.filter((t) => t.id !== id);
}

export function clearDone(list: Todo[]): Todo[] {
  return list.filter((t) => !t.done);
}

const priorityOrder: Record<Priority, number> = { high: 0, normal: 1, low: 2 };

export function sorted(list: Todo[]): Todo[] {
  return [...list].sort((a, b) => Number(a.done) - Number(b.done) || priorityOrder[a.priority] - priorityOrder[b.priority] || a.id - b.id);
}
