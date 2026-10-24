// Chapter 4.4 - Objects and type aliases
// Run: npx tsx chapter-04-data-structures/04-objects-type-aliases.ts
//
// Real-world picture: an ID card. Each field has a label (name, date of birth,
// blood group), and every ID card in the company has the same fields.

type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

const priya: Employee = {
  id: 101,
  name: "Priya Nair",
  department: "Engineering",
  salary: 1_200_000,
};

console.log(`${priya.name} works in ${priya.department}`);
console.log("Salary via bracket syntax:", priya["salary"]);

// Change a property
priya.department = "Platform Engineering";
console.log("New department:", priya.department);

// Objects inside objects
type Address = { city: string; pin: string };
type Customer = { name: string; address: Address };

const customer: Customer = { name: "Rahul", address: { city: "Jaipur", pin: "302001" } };
console.log(`${customer.name} lives in ${customer.address.city} (${customer.address.pin})`);

// Methods: functions stored on an object
const counter = {
  count: 0,
  increment() {
    this.count++;
    return this.count;
  },
};
counter.increment();
console.log("Counter:", counter.increment());

// Missing or extra fields are errors:
// const bad: Employee = { id: 2, name: "X" };
// Error: Type is missing the following properties: department, salary

// Useful built-ins
console.log("Keys:", Object.keys(priya));
console.log("Values:", Object.values(priya));
