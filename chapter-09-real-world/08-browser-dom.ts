// Chapter 9.8 - TypeScript in the browser: the DOM
// Build: npm run build:browser    Then open chapter-09-real-world/browser/index.html
//
// Real-world picture: a remote control for a TV. The web page is the TV,
// and your code presses buttons: change text, show items, react to clicks.

const input = document.querySelector<HTMLInputElement>("#task-input");
const button = document.querySelector<HTMLButtonElement>("#add-button");
const list = document.querySelector<HTMLUListElement>("#task-list");
const counter = document.querySelector<HTMLSpanElement>("#count");

// querySelector may return null if the element is missing, so we check once.
if (!input || !button || !list || !counter) {
  throw new Error("Page is missing an element");
}

let count = 0;

function addTask(text: string): void {
  const item = document.createElement("li");
  item.textContent = text;
  item.addEventListener("click", () => {
    item.classList.toggle("done"); // click a task to tick it off
  });
  list!.appendChild(item);
  count++;
  counter!.textContent = String(count);
}

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;
  addTask(text);
  input.value = "";
  input.focus();
});

// Press Enter to add, too. KeyboardEvent is a type from the DOM library.
input.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") button.click();
});

addTask("Read chapter 9");
