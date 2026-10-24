// Chapter 2.1 - Making decisions with if / else
// Run: npx tsx chapter-02-control-flow/01-if-else.ts
//
// Real-world picture: a traffic light. Green: go. Yellow: slow down. Red: stop.

function trafficAction(light: string): string {
  if (light === "green") {
    return "Go";
  } else if (light === "yellow") {
    return "Slow down";
  } else if (light === "red") {
    return "Stop";
  } else {
    return "Signal broken: proceed with care";
  }
}

for (const light of ["green", "yellow", "red", "blinking"]) {
  console.log(`${light.padEnd(8)} -> ${trafficAction(light)}`);
}

// A real rule: free delivery on orders of Rs 499 or more.
const cartTotal = 450;
if (cartTotal >= 499) {
  console.log("Free delivery!");
} else {
  console.log(`Add Rs ${499 - cartTotal} more for free delivery.`);
}
