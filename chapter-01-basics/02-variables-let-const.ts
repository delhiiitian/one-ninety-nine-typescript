// Chapter 1.2 - Variables with let and const
// Run: npx tsx chapter-01-basics/02-variables-let-const.ts
//
// Real-world picture: `const` is your date of birth (never changes),
// `let` is your bank balance (changes every month).

const customerName = "Asha";      // fixed for this program run
let walletBalance = 500;          // will change

console.log(`${customerName} starts with Rs ${walletBalance}`);

walletBalance = walletBalance - 120; // bought groceries
console.log(`After groceries: Rs ${walletBalance}`);

walletBalance += 1000;               // salary credited (same as walletBalance = walletBalance + 1000)
console.log(`After salary:    Rs ${walletBalance}`);

// customerName = "Ravi";  // Error: Cannot assign to 'customerName' because it is a constant.

// const stops re-assignment, not changes inside an object.
const cart = { items: 0 };
cart.items = 3; // allowed: the variable still points to the same cart
console.log("Items in cart:", cart.items);

// Block scope: a variable made inside { } lives only inside those braces.
{
  const discountCode = "WELCOME10";
  console.log("Inside the block, code is", discountCode);
}
// console.log(discountCode); // Error: Cannot find name 'discountCode'.
