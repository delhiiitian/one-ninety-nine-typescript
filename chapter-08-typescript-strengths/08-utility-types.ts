// Chapter 8.8 - Utility types: Partial, Required, Pick, Omit, Readonly, Record
// Run: npx tsx chapter-08-typescript-strengths/08-utility-types.ts
//
// Real-world picture: photocopier settings. Start from one original document (a type)
// and make variations: a cropped copy (Pick), one with a part blanked out (Omit),
// a laminated copy nobody can write on (Readonly).

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  city: string;
}

// Partial: every field optional, perfect for "update a few fields"
function updateUser(user: User, changes: Partial<User>): User {
  return { ...user, ...changes };
}

// Omit: hide sensitive fields before sending data to the browser
type PublicUser = Omit<User, "password">;
function toPublic({ password, ...rest }: User): PublicUser {
  return rest;
}

// Pick: only what a small widget needs
type UserBadge = Pick<User, "name" | "city">;

// Readonly: a frozen snapshot
const original: Readonly<User> = { id: 1, name: "Kiran", email: "k@x.in", password: "hunter2", city: "Mysuru" };
// original.name = "K"; // Error: Cannot assign to 'name' because it is a read-only property.

const moved = updateUser(original, { city: "Bengaluru" });
console.log("Updated:", moved.city);
console.log("Public view:", toPublic(moved));
const badge: UserBadge = { name: moved.name, city: moved.city };
console.log("Badge:", badge);

// Record: an object with a fixed set of keys and one value type
type Weekday = "mon" | "tue" | "wed" | "thu" | "fri";
const steps: Record<Weekday, number> = { mon: 8200, tue: 10450, wed: 6100, thu: 12000, fri: 9050 };
console.log("Total steps:", Object.values(steps).reduce((a, b) => a + b, 0));

// Required: the opposite of Partial
interface Draft { title?: string; body?: string }
const published: Required<Draft> = { title: "Hello", body: "First post" };
console.log("Published:", published.title);

// ReturnType: reuse the type a function returns
type PublicUserFromFn = ReturnType<typeof toPublic>;
const sample: PublicUserFromFn = { id: 2, name: "Ali", email: "a@x.in", city: "Kochi" };
console.log("ReturnType works:", sample.name);
