// Chapter 3.2 - Optional and default parameters
// Run: npx tsx chapter-03-functions/02-optional-default-params.ts
//
// Real-world picture: ordering coffee. "A latte" is enough; the barista assumes
// a medium size (default). Extra syrup is only added if you ask (optional).

function orderCoffee(drink: string, size: string = "medium", syrup?: string): string {
  let order = `${size} ${drink}`;
  if (syrup) {
    order += ` with ${syrup} syrup`;
  }
  return order;
}

console.log(orderCoffee("latte"));
console.log(orderCoffee("cappuccino", "large"));
console.log(orderCoffee("mocha", "small", "hazelnut"));

// Skip a middle parameter by passing undefined: the default kicks in.
console.log(orderCoffee("americano", undefined, "vanilla"));

// Real use: building a greeting for an app notification.
function notify(user: string, message = "You have a new message", urgent = false): string {
  return `${urgent ? "[URGENT] " : ""}${user}: ${message}`;
}
console.log(notify("Riya"));
console.log(notify("Riya", "Your parcel is out for delivery"));
console.log(notify("Riya", "Login from a new device", true));
