// Chapter 2.3 - The switch statement
// Run: npx tsx chapter-02-control-flow/03-switch.ts
//
// Real-world picture: a lift (elevator) panel.
// You press one button and the lift jumps straight to that floor.

function floorName(floor: number): string {
  switch (floor) {
    case 0:
      return "Lobby";
    case 1:
    case 2:
      return "Offices";        // floors 1 and 2 share one answer
    case 3:
      return "Cafeteria";
    case 4:
      return "Gym";
    default:
      return "No such floor";
  }
}

for (let f = 0; f <= 5; f++) {
  console.log(`Floor ${f}: ${floorName(f)}`);
}

// Watch for "fall through": without break/return, the next case runs too.
const plan: string = "gold";
switch (plan) {
  case "gold":
    console.log("Free lounge access");
    // no break here, so silver perks are added as well
  case "silver":
    console.log("Priority boarding");
    break;
  default:
    console.log("Standard ticket");
}
