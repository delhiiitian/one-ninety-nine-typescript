// Chapter 1.3 - The basic types: string, number, boolean
// Run: npx tsx chapter-01-basics/03-basic-types.ts
//
// Real-world picture: a form at the bank. The "Name" box takes letters,
// the "Amount" box takes digits, and "Is this a joint account?" is a tick box.

const accountHolder: string = "Meera Iyer";
const openingDeposit: number = 2500.75;   // integers and decimals share one type
const isJointAccount: boolean = false;

console.log("Holder:", accountHolder, "| type:", typeof accountHolder);
console.log("Deposit:", openingDeposit, "| type:", typeof openingDeposit);
console.log("Joint?", isJointAccount, "| type:", typeof isJointAccount);

// Numbers can be written in different ways.
const million = 1_000_000;  // underscores make big numbers readable
const hexColor = 0xff;      // 255 in hexadecimal
console.log(million, hexColor);

// Special number values.
console.log("1 / 0 =", 1 / 0);          // Infinity
console.log("'abc' * 2 =", Number("abc") * 2); // NaN means "Not a Number"

// Strings can use single quotes, double quotes, or backticks.
const branch = 'MG Road';
const city = "Bengaluru";
console.log(`Branch: ${branch}, ${city}`);
