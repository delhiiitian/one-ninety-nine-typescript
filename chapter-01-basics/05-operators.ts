// Chapter 1.5 - Arithmetic and assignment operators
// Run: npx tsx chapter-01-basics/05-operators.ts
//
// Real-world picture: a restaurant bill. You add items, multiply by quantity,
// divide between friends, and use the remainder to see who pays the extra coin.

const pizzaPrice = 349;
const pizzas = 3;
const friends = 4;

const subtotal = pizzaPrice * pizzas;          // multiplication
const tax = subtotal * 0.05;                   // 5% tax
const total = subtotal + tax;                  // addition
const perPerson = Math.floor(total / friends); // division, rounded down
const leftover = Math.round(total) % friends;  // remainder (modulo)

console.log("Subtotal:", subtotal);
console.log("Tax:", tax.toFixed(2));
console.log("Total:", total.toFixed(2));
console.log("Each pays:", perPerson, "| leftover rupees:", leftover);

// Exponent
console.log("2 to the power 10 =", 2 ** 10);

// Compound assignment and increment
let loyaltyPoints = 10;
loyaltyPoints += 5;   // 15
loyaltyPoints *= 2;   // 30
loyaltyPoints--;      // 29
console.log("Loyalty points:", loyaltyPoints);

// Decimal surprise: computers store decimals in binary.
console.log("0.1 + 0.2 =", 0.1 + 0.2);
console.log("Fixed:", (0.1 + 0.2).toFixed(2));
