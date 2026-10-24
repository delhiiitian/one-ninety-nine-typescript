// Chapter 3.5 - Function types
// Run: npx tsx chapter-03-functions/05-function-types.ts
//
// Real-world picture: a job description. "We need someone who takes an order
// amount and returns a discount." Anyone matching that description can do the job.

type DiscountRule = (amount: number) => number;

const noDiscount: DiscountRule = () => 0;
const festiveSale: DiscountRule = (amount) => amount * 0.2;
const flatHundred: DiscountRule = (amount) => (amount >= 1000 ? 100 : 0);

function checkout(amount: number, rule: DiscountRule): string {
  const discount = rule(amount);
  return `Amount ${amount}, discount ${discount}, pay ${amount - discount}`;
}

console.log(checkout(1500, noDiscount));
console.log(checkout(1500, festiveSale));
console.log(checkout(1500, flatHundred));

// Function types can describe several parameters, too.
type Formatter = (label: string, value: number) => string;
const asRupees: Formatter = (label, value) => `${label}: Rs ${value.toFixed(2)}`;
console.log(asRupees("Electricity bill", 1842.5));

// A function that does not match the type is rejected:
// const wrong: DiscountRule = (code: string) => 10;
// Error: Type '(code: string) => number' is not assignable to type 'DiscountRule'.
