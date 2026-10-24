// Chapter 9.6 - Validating data from the outside world
// Run: npx tsx chapter-09-real-world/06-validating-external-data.ts
//
// Real-world picture: a bank teller checking a cheque. The signature, date and
// amount are verified before any money moves, however official the cheque looks.
// TypeScript types vanish at run time, so data from APIs, files and users must be checked.

interface Signup {
  name: string;
  email: string;
  age: number;
  interests: string[];
}

type Check<T> = { ok: true; value: T } | { ok: false; errors: string[] };

function validateSignup(input: unknown): Check<Signup> {
  const errors: string[] = [];
  if (typeof input !== "object" || input === null) return { ok: false, errors: ["Body must be an object"] };
  const d = input as Record<string, unknown>;

  if (typeof d.name !== "string" || d.name.trim().length < 2) errors.push("name: at least 2 characters");
  if (typeof d.email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) errors.push("email: invalid");
  if (typeof d.age !== "number" || !Number.isInteger(d.age) || d.age < 13) errors.push("age: whole number, 13+");
  if (!Array.isArray(d.interests) || !d.interests.every((i) => typeof i === "string"))
    errors.push("interests: list of text");

  if (errors.length) return { ok: false, errors };
  return { ok: true, value: d as unknown as Signup };
}

const incoming = [
  '{"name":"Rhea","email":"rhea@mail.com","age":19,"interests":["music","coding"]}',
  '{"name":"R","email":"not-an-email","age":"nineteen","interests":"music"}',
  "[1, 2, 3]",
];

for (const text of incoming) {
  const result = validateSignup(JSON.parse(text));
  if (result.ok) {
    console.log(`Valid: ${result.value.name} likes ${result.value.interests.join(" & ")}`);
  } else {
    console.log("Rejected:", result.errors.join("; "));
  }
}
// In bigger projects, libraries such as Zod or Valibot generate these checks
// and the TypeScript type from one schema.
